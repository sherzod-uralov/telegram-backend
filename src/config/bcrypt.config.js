import bcrypt from 'bcrypt'
const hash = (paswd) => bcrypt.hash(paswd,3);

const compare = (paswd,hashPawsd) => bcrypt.compare(paswd,hashPawsd);

export {hash,compare}