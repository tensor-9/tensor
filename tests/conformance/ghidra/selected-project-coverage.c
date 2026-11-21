volatile int tensor_project_global = 7;
__attribute__((noinline, used)) int tensor_project_leaf(int x) {
  return x + tensor_project_global;
}
__attribute__((noinline, used)) int tensor_project_caller(int x) {
  return tensor_project_leaf(x);
}
__attribute__((noinline, used)) int tensor_project_other(int x) {
  return x - tensor_project_global;
}
__attribute__((noinline, used)) int tensor_project_callback(int (*fn)(int), int x) {
  return fn(x) + tensor_project_global;
}
int main(void) { return tensor_project_caller(tensor_project_global); }
