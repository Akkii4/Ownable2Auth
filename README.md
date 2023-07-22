# Ownable2Auth

Ownable2Auth is an abstract Solidity contract that provides a basic access control mechanism with a two-step ownership transfer/renounce process.

## Features

- Single owner of contract
- `onlyOwner` modifier restricts access to owner-only functions
- Ownership can be transferred to a new owner
- New owner must accept transfer
- Two-step process to renounce ownership

## Usage

Inherit from the Ownable2Auth contract to gain the ownership features:

```solidity
import "./Ownable2Auth.sol";

contract MyContract is Ownable2Auth {
  // Contract now has owner capabilities
}
```

Deploy the contract while passing in the initial owner address.

Later transfer ownership by calling `transferOwnership` and new owner calls `acceptOwnership`.

Renounce ownership in two steps by first calling `initiateRenounceOwnership` and then `renounceOwnership`.

## Functions

**owner**

Returns the address of the current owner.

**pendingOwner**

Returns the address of the pending owner.

**transferOwnership**

Transfers ownership to a new address. Emits an event.

**acceptOwnership**

Called by the new owner to accept the ownership transfer.

**renounceOwnership**

Renounces ownership by transferring to the zero address. Requires initiateRenounceOwnership to be called first.

**onlyOwner**

Modifier to restrict access to only the owner.

## Events

**OwnershipTransferStarted**

Emitted when transferOwnership is called to start a new pending owner.

**OwnershipTransferred**

Emitted when a transfer completes through acceptOwnership or renounceOwnership.

## Usage

Install dependencies:

```
npm install
```

Compile:

```
npx hardhat compile
```

Test:

```
npx hardhat test
```

## License

MIT
