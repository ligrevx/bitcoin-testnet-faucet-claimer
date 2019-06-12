
// https://tbtc.bitaps.com/

window.addEventListener('DOMContentLoaded', function() {
    // this is not called when page already loaded and you paste script into console
    console.log('Loaded');
});

(function() {
    console.log('Starting...');

    const btcAddress = "2NBMEXBQwDWH1ouuX2KVcvk5gLkdgKazpoQ"; // bitmex testnet
    const maxClaimAmount = 0.01;
    const intervalMs = 5 * 60 * 1000 + (10 * 1000); // 5 min + 10 sec
    let totalClaimedAmount = 0; // TODO
    let claimInterval = null;

    function startClaiming() {
        console.log('Start claiming.');

        // first run
        claim(btcAddress, maxClaimAmount);

        // intervals
        claimInterval = setInterval(() => {
            claim(btcAddress, maxClaimAmount);
        }, intervalMs);
    }

    function stopClaiming() {
        clearInterval(claimInterval);
    }

    function claim(btcAddress, amount) {
        console.log(`${new Date()}:`);
        console.log(`Claim ${amount} BTC to ${btcAddress}`);

        let receiveButtonEl = document.getElementById("receive");
        let addressInputEl = document.getElementById("faucet-address");
        let amountInputEl = document.getElementById("faucet-amount");
        let resultEl = document.getElementById("faucet-result");

        // fallback
        if(!receiveButtonEl) {
            receiveButtonEl = document.querySelector('[name="receive"]');
        }
        if(!addressInputEl) {
            addressInputEl = document.querySelectorAll('[name="address"]')[0];
        }
        if(!amountInputEl) {
            amountInputEl = document.querySelectorAll('[name="address"]')[1];
        }

        // validation
        if(!receiveButtonEl) {
            stopClaiming();
            throw new Error("Cannot find claim button!");
        }
        if(!addressInputEl) {
            stopClaiming();
            throw new Error("Cannot find address input button!");
        }
        if(!amountInputEl) {
            stopClaiming();
            throw new Error("Cannot find amount input button!");
        }

        // fill inputs
        addressInputEl.value = btcAddress;
        amountInputEl.value = amount;

        // claim BTC
        receiveButtonEl.dispatchEvent(new Event('click'));

        // log results
        setTimeout(() => {
            console.log(`Result: ${resultEl.innerText}`);
            console.log('\n\n');
            console.log(`Waiting for next chance to claim in ${intervalMs / 1000} seconds / ${(intervalMs / 1000 / 60).toFixed(2)} minutes...`);
            console.log('\n\n');
        }, 5000);
    }

    startClaiming();

    window.startClaiming = startClaiming;
    window.stopClaiming = stopClaiming;
})();
