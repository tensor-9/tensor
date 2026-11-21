// A real initialized data range, with independently recognizable endpoints.
volatile unsigned char tensor_large_payload[TENSOR_PAYLOAD_BYTES] = {
    [0] = 0x5a, [TENSOR_PAYLOAD_BYTES - 1] = 0xa5};

__attribute__((noinline, used)) int tensor_large_entry(void) {
  return tensor_large_payload[0] + tensor_large_payload[TENSOR_PAYLOAD_BYTES - 1];
}

int main(void) { return tensor_large_entry(); }
