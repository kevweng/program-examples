use anchor_lang::prelude::*;
declare_id!("31nkast5V8Xx7uyZDQSqfQPqNzHhFXxP9LAXm88MTJNM");
#[program]
pub mod counter {
    use super::*;
    pub fn initialize(ctx: Context<InitializeContext>) -> Result<()> {
        ctx.accounts.state.counter = 0;
        Ok(())
    }
    pub fn increment(ctx: Context<IncrementContext>) -> Result<()> {
        ctx.accounts.state.counter = ctx.accounts.state.counter + 1;
        Ok(())
    }
}
#[derive(Accounts)]
pub struct InitializeContext<'info> {
    #[account(init, payer = user, space = 17, seeds = [b"counter"], bump)]
    pub state: Account<'info, CounterState>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct IncrementContext<'info> {
    #[account(mut, seeds = [b"counter"], bump)]
    pub state: Account<'info, CounterState>,
    pub system_program: Program<'info, System>,
}
#[account]
pub struct CounterState {
    pub counter: i64,
    pub bump: u8,
}
