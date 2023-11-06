import { hash } from '../config/bcrypt.config.js';
import { signin } from '../config/jwt.config.js';
import { Users } from '../models/user/users.js';
import { sendVerificationEmail } from '../config/sendVerificationEmail.js';

const register = async (req, res) => {
  try {
    let profileImagePath;
    const { username, password, last_name, second_name, bio } = req.body;

    // Parolni hash qilish
    const hashPaswd = await hash(password);

    // Emailga yuboriladigan tekshiruv kodi
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Foydalanuvchi ma'lumotlarini saqlash
    const addUser = await Users.create({
      username, // Emailni usernameni o'rniga ishlatamiz
      password: hashPaswd,
      last_name,
      second_name,
      bio,
      profile_image: profileImagePath || null,
      verification_code: verificationCode, // Tekshiruv kodi
    });

    // Emailga kodni yuborish
    await sendVerificationEmail(username, verificationCode); // Sizning email yuborish funktsiyangizni ishlatish kerak

    const token = signin({ username, password }, process.env.SEC_KEY);

    res.status(201).json({
      status: 201,
      addUser,
      msg: 'Foydalanuvchi muvaffaqiyatli yaratildi. Emailni tasdiqlang!',
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      msg: 'Ichki server xatosi',
      error,
    });
  }
};

export { register };
