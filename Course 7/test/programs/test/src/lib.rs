use anchor_lang::prelude::*;

declare_id!("HzcmJAM1urKxuUrhHcG7JFNyferB8c7Ht2ZumdWCg8wD");

#[program]
pub mod test {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}