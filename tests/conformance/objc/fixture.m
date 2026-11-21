#import <Foundation/Foundation.h>
@protocol TensorWidgetDelegate <NSObject>
- (void)widgetDidFinish;
@end
@interface TensorWidget : NSObject
@property(nonatomic, weak) id<TensorWidgetDelegate> delegate;
- (BOOL)performAction:(NSString *)action error:(NSError **)error;
@end
@implementation TensorWidget
- (BOOL)performAction:(NSString *)action error:(NSError **)error {
  NSLog(@"TENSOR_OBJC_ACTION:%@", action);
  return action.length > 0;
}
@end
int main(void) {
  @autoreleasepool {
    Protocol *protocol = @protocol(TensorWidgetDelegate);
    NSLog(@"%@", NSStringFromProtocol(protocol));
    NSLog(@"TENSOR_UTF16_é_😀");
    NSLog(@"TENSOR_UTF16_ESCAPED_é_\"\\line\nend\t\r");
    NSLog(@"\nTENSOR_UTF16_LEADING_é");
    return [[[TensorWidget alloc] init] performAction:@"run" error:0] ? 0 : 1;
  }
}
