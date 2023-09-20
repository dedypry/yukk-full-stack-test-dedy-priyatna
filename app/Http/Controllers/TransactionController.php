<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    use Response;

    public function index(Request $request)
    {
        $count = $request->has('perPage') ? $request->perPage : 10;
        $user = Auth::user();
        $data = Transaction::where('user_id', $user->id)
            ->where(function ($q) use ($request) {
                if ($request->has('type')) {
                    $q->where('type', $request->type);
                }

                if ($request->has('date_from')) {
                    $q->where('created_at', '>=', $request->date_from);
                }

                if ($request->has('date_to')) {
                    $q->where('created_at', '<=', $request->date_to);
                }

                if ($request->has('search')) {
                    $q->where('notes', 'like', "%$request->search%")
                        ->orWhere('type', 'like', "%$request->search%");
                }
            })
            ->paginate($count);

        return $this->success($data, null, 200, ['balance' => self::balance()]);
    }

    public function create(Request $request)
    {
        $valid = Validator::make($request->all(), [
            "type" => "required",
            "amount" => "required|numeric",

        ]);

        $user = Auth::user();

        if ($valid->fails()) {
            return $this->error($valid->messages());
        }

        $balance = self::balance()->amount;

        if ($request->has('id')) {
            $trans = Transaction::find($request->id);
            $balance = $balance - $trans->amount;
        }

        if ($request->type != 'topup' && $balance < $request->amount) {
            return $this->error('Your Balance is not enough');
        }

        Transaction::updateOrCreate(['id' => $request->id], [
            'user_id' => $user->id,
            "type" => strtolower($request->type),
            "amount" => $request->amount,
            "notes" => $request->notes,
        ]);

        return $this->success(null, 'data saved');
    }

    public function balance()
    {
        $user = Auth::user();

        return Transaction::select(
            DB::raw("SUM(CASE WHEN type = 'topup' THEN amount ELSE -amount END) AS amount")
        )
            ->where('user_id', $user->id)
            ->first();
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return $this->success(null, 'success deleted');
    }
}
