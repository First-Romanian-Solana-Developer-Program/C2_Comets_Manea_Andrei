use anchor_lang::prelude::*;

declare_id!("37SQXhbSkx5ZnBErftFtwRZyuWhjxjw3xApXSLFwk1AA");

pub const ANCHOR_DISCRIMINATOR_SIZE: usize = 8;

#[program]
pub mod favorites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn set_favourites(
    	ctx: Context<SetFavourites>, 
    	number: u64, 
    	color: String, 
    	hobbies: Vec<String>
    ) -> Result<()> {
		msg!("User number is {:?} and favourite color is {:?}", number, color);
		msg!("User's hobbies are {:?}", hobbies);
		ctx.accounts.favourites.set_inner(Favourites {
			number,
			color,
			hobbies,
		});
    	Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct SetFavourites<'info> {
	#[account(mut)]
	pub user: Signer<'info>,

	#[account(
		init,
		payer = user,
		space = ANCHOR_DISCRIMINATOR_SIZE + Favourites::INIT_SPACE,
		seeds = [b"favourites", user.key().as_ref()],
		bump
	)]
	pub favourites: Account<'info, Favourites>, 	

	pub system_program: Program<'info, System>,
}


#[account]
#[derive(InitSpace)]
pub struct Favourites {
	pub number: u64,

	#[max_len(50)]
	pub color: String,

	#[max_len(5,50)]
	pub hobbies: Vec<String>,
}
