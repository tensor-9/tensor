#import <Foundation/Foundation.h>

@protocol TensorDispatchProtocol
@property(nonatomic, copy) NSString *fixtureName;
- (void)performAction:(id)sender;
@optional
- (int)optionalFixtureValue;
@end

@interface TensorDispatchFixture : NSObject <TensorDispatchProtocol> {
  int state;
}
@property(nonatomic, copy) NSString *fixtureName;
@property NSInteger atomicValue;
- (void)performAction:(id)sender;
+ (int)fixtureVersion;
@end
@implementation TensorDispatchFixture
- (void)performAction:(id)sender { state += sender == nil ? 1 : 2; }
+ (int)fixtureVersion { return 1; }
@end

@interface NSString (TensorDispatchAdditions)
- (NSUInteger)tensorFixtureLength;
@end
@implementation NSString (TensorDispatchAdditions)
- (NSUInteger)tensorFixtureLength { return self.length; }
@end
int main(void) { return 0; }
