#ifdef _WIN32
#define TENSOR_EXPORT __declspec(dllexport)
#define TENSOR_NOINLINE __declspec(noinline)
#else
#define TENSOR_EXPORT __attribute__((visibility("default")))
#define TENSOR_NOINLINE __attribute__((noinline))
#endif

TENSOR_EXPORT TENSOR_NOINLINE int tensor_fixture_add(int left, int right) {
  return left + right + 7;
}

TENSOR_EXPORT TENSOR_NOINLINE int tensor_fixture_subtract(int left, int right) {
  return left - right - 13;
}

int main(void) {
  return tensor_fixture_add(11, 24) + tensor_fixture_subtract(24, 11);
}
