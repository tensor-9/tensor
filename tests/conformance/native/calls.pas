program TensorPascalCalls;

{$mode objfpc}
{$inline off}

procedure TensorPascalCall(Value: LongInt); cdecl; public name 'tensor_pascal_call';
begin
  WriteLn('pascal ', Value);
end;

var
  Index: LongInt;
begin
  for Index := 0 to 2 do { TENSOR_VERIFY_CALLER_LOOP }
    TensorPascalCall(Index); { TENSOR_VERIFY_CALLER_CALL }
end.
