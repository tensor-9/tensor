#include <stdlib.h>
#include <string.h>
#include <errno.h>

extern void *__tls_get_addr(void *);
extern int *__errno_location(void);
extern void tensor_unknown_stop(void);
extern void _Unwind_Resume(void *) __attribute__((noreturn));
volatile unsigned long tensor_after_call;

void *tensor_malloc(size_t n) {
    void *p = malloc(n);
    tensor_after_call++;
    return p;
}
void *tensor_malloc_adjacent(size_t n) {
    void *p = malloc(n);
    tensor_after_call++;
    return p;
}
__attribute__((visibility("hidden"))) void *tensor_tls(void *p) {
    void *value = __tls_get_addr(p);
    tensor_after_call++;
    return value;
}
__attribute__((visibility("hidden"))) void *tensor_tls_chain(void *p) {
    void *value = tensor_tls(p);
    tensor_after_call++;
    return value;
}
void *tensor_tls_outer(void *p) {
    void *value = tensor_tls_chain(p);
    tensor_after_call++;
    return value;
}
void *tensor_memcpy(void *out, const void *in, size_t n) {
    void *value = memcpy(out, in, n);
    tensor_after_call++;
    return value;
}
void *tensor_memset(void *out, int c, size_t n) {
    void *value = memset(out, c, n);
    tensor_after_call++;
    return value;
}
size_t tensor_strlen(const char *p) {
    size_t value = strlen(p);
    tensor_after_call++;
    return value;
}
int *tensor_errno(void) {
    int *p = __errno_location();
    tensor_after_call++;
    return p;
}
void tensor_unknown(void) {
    tensor_unknown_stop();
    tensor_after_call++;
}
void tensor_abort(void) { abort(); }
void tensor_unwind(void *p) { _Unwind_Resume(p); }
void tensor_local_stop(void) { __builtin_trap(); }
int tensor_local_return(void) { return 1658; }
