#include <stdint.h>

/* esp_bootloader_desc_t layout from ESP-IDF v6.1 esp_bootloader_desc.h. */
typedef struct {
  uint8_t magic_byte;
  uint8_t reserved[2];
  uint8_t secure_version;
  uint32_t version;
  char idf_ver[32];
  char date_time[24];
  uint8_t reserved2[16];
} tensor_bootloader_desc_t;

_Static_assert(sizeof(tensor_bootloader_desc_t) == 80,
               "esp_bootloader_desc_t is 80 bytes");

__attribute__((section(".dram0.bootdesc"), used))
const tensor_bootloader_desc_t tensor_bootloader_desc = {
    .magic_byte = 80,
    .secure_version = 2,
    .version = 7,
    .idf_ver = "v6.1-tensor",
    .date_time = "Jan  1 2026 00:00:00",
};

__attribute__((section(".dram0.data"), used)) volatile int tensor_counter = 7;

__attribute__((section(".iram_loader.text"), used, noreturn)) void
tensor_entry(void) {
  for (;;)
    tensor_counter += 1;
}
