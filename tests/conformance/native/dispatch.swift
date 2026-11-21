public protocol TensorWitnessFixtureProtocol { func fixtureValue() -> Int }
public struct TensorWitnessFixture: TensorWitnessFixtureProtocol {
  public init() {}
  public func fixtureValue() -> Int { 17 }
}
@_cdecl("tensor_witness_fixture_entry")
public func fixtureEntry() -> Int { TensorWitnessFixture().fixtureValue() }

public class TensorVtableFixture {
  public init() {}
  public func fixtureValue() -> Int { 23 }
}

public enum TensorDeclFixtureEnum { case first, second(Int) }
public struct TensorDeclFixtureOuter {
  public struct Inner { public init() {} }
}
public struct TensorDeclFixtureGeneric<Value> {
  public var value: Value
  public init(_ value: Value) { self.value = value }
}
public actor TensorDeclFixtureActor {
  public init() {}
}


// Distinct same-leaf protocols and conforming types exercise both parent chains.
public enum TensorNestedA {
  public protocol Requirement { func nestedValue() -> Int }
  public struct Implementation: Requirement {
    public init() {}
    public func nestedValue() -> Int { 31 }
  }
}
public enum TensorNestedB {
  public protocol Requirement { func nestedValue() -> Int }
  public struct Implementation: Requirement {
    public init() {}
    public func nestedValue() -> Int { 37 }
  }
}
