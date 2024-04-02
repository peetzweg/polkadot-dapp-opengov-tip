# OpenGovernance Tip Interface (WIP)

This dapp was created from the [`polkadot-dapp-template`](https://github.com/peetzweg/polkadot-dapp-template).

## Examples

Submit Proposal
+ https://github.com/paritytech/substrate-tip-bot/blob/8f162fded8fc31b3950e9d6ee5d33f6f91d50b32/src/tip-opengov.ts#L27-L55

+ https://github.com/paritytech/substrate-tip-bot/blob/8f162fded8fc31b3950e9d6ee5d33f6f91d50b32/src/util.ts#L157-L177


Get Referendum ID:
+ https://github.com/paritytech/substrate-tip-bot/blob/8f162fded8fc31b3950e9d6ee5d33f6f91d50b32/src/util.ts#L179-L199



Referendum: https://polkadot.polkassembly.io/referenda/589

+ how to edit post:
https://github.com/paritytech/substrate-tip-bot/blob/8f162fded8fc31b3950e9d6ee5d33f6f91d50b32/src/polkassembly/polkassembly.ts


## Todo

+ add chain via provider not hardcoded path:
https://docs.pmnd.rs/zustand/guides/initialize-state-with-props

+ make sure on right chain, check genesis hash
+ ~~success event~~
+ failure event
+ referenda id event
+ dry run, enough funds, broken call?
+ loading state
+ validate beneficiary address
+ require state of amount
+ general error state of form
+ how to show failed extrinsic
+ pass along proposal description to polkassembly?
+ indicate extrinsic states, success, progress, result
+ better description of what is happening, explaining SmallTipper track, add links
+ better indicate how much money is reserved during proposal, how to free up reserved balance? Done automatically after proposal success,failure?
