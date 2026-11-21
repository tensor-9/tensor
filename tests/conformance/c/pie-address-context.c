__attribute__((noinline)) int tensor_pie_add(int value) {
    return value + 7;
}

int tensor_pie_entry(void) {
    return tensor_pie_add(35);
}
