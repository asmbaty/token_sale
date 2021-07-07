const ArdinisToken = artifacts.require('ArdinisToken');
const truffleAssert = require('truffle-assertions');


contract('ArdinisToken', (accounts) => {
    let contract;

    let totalSupply = 100000;

    let alice = accounts[0];
    let bob = accounts[1];

    beforeEach('Setup contract for each test', async () => {
        contract = await ArdinisToken.new(totalSupply);
    });

    it('Success on creating tokens with required supply', async () => {
        const supply = await contract.totalSupply();
        expect(supply.toNumber()).to.equal(totalSupply);
    });

    it('Alice has the total supply at the beginning', async () => {
        const balance = await contract.balanceOf(alice);
        expect(balance.toNumber()).to.equal(totalSupply);
    });

    describe('Alice sends some tokens to Bob', async () => {
        const tokensSent = 300;

        beforeEach(`Alice sends ${tokensSent} to Bob`, async () => {
            await contract.transfer(bob, tokensSent, {from: alice});
        });

        it(`Bob has ${tokensSent}`, async () => {
            const balance = await contract.balanceOf(bob);
            expect(balance.toNumber()).to.equal(tokensSent);
        });
        
        it('Alices balance is decreased now', async () => {
            const balance = await contract.balanceOf(alice);
            expect(balance.toNumber()).to.equal(totalSupply - tokensSent);
        });
    });

    // it('Bob cannot send more money than he has', async () => {
    //     await contract.mint(bob, 100, {from: alice});
    //     await truffleAssert.reverts(
    //         contract.send(carol, 101, {from: bob}),
    //         truffleAssert.ErrorType.REVERT
    //     );
    // });
})