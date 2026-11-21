import Darwin

protocol TensorProtocol { func execute() -> Int }
struct TensorRecord { let value: Int }
enum TensorState { case ready, finished }
final class TensorService: TensorProtocol {
  @inline(never) func execute() -> Int { print("TENSOR_SWIFT_EXECUTE"); return 42 }
}
extension TensorRecord { @inline(never) func doubled() -> Int { value * 2 } }
let service = TensorService()
exit(service.execute() == 42 ? 0 : 1)
