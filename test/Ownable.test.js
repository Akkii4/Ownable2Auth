const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ownable2Auth", function () {
  let ownable2Auth;
  let owner;
  let accountA;
  let accountB;

  beforeEach(async function () {
    [owner, accountA, accountB] = await ethers.getSigners();
    const MockOwnable2Auth = await ethers.getContractFactory(
      "Ownable2AuthMock"
    );
    ownable2Auth = await MockOwnable2Auth.deploy();
    await ownable2Auth.deployed();
  });

  describe("transfer ownership", function () {
    it("starting a transfer does not change owner", async function () {
      await ownable2Auth.connect(owner).transferOwnership(accountA.address);
      const pendingOwner = await ownable2Auth.pendingOwner();
      expect(pendingOwner).to.equal(accountA.address);
      expect(await ownable2Auth.owner()).to.equal(owner.address);
    });

    it("changes owner after transfer", async function () {
      await ownable2Auth.connect(owner).transferOwnership(accountA.address);
      await ownable2Auth.connect(accountA).acceptOwnership();
      const newOwner = await ownable2Auth.owner();
      expect(newOwner).to.equal(accountA.address);
      expect(await ownable2Auth.pendingOwner()).to.equal(
        ethers.constants.AddressZero
      );
    });

    it("guards transfer against invalid user", async function () {
      await ownable2Auth.connect(owner).transferOwnership(accountA.address);
      await expect(ownable2Auth.connect(accountB).acceptOwnership()).to.be
        .revertedWithCustomError;
    });
  });

  describe("renouncing ownership", function () {
    it("changes owner after renouncing ownership", async function () {
      await ownable2Auth.connect(owner).initiateRenounceOwnership();
      await ownable2Auth.connect(owner).renounceOwnership();
      const newOwner = await ownable2Auth.owner();
      expect(newOwner).to.equal(ethers.constants.AddressZero);
    });

    it("pending owner resets after renouncing ownership", async function () {
      await ownable2Auth.connect(owner).transferOwnership(accountA.address);
      await ownable2Auth.connect(owner).initiateRenounceOwnership();
      await ownable2Auth.connect(owner).renounceOwnership();
      const pendingOwner = await ownable2Auth.pendingOwner();
      expect(pendingOwner).to.equal(ethers.constants.AddressZero);
      await expect(ownable2Auth.connect(accountA).acceptOwnership()).to
        .revertedWithCustomError;
    });
  });
});
