import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import auth from '../../../middleware/auth';

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await uploadInfor(req, res)
            break;
        case "PATCH":
            await updateAddress(req, res)
            break;
    }
}

const uploadInfor = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { name } = req.body

        const newUser = await Users.findOneAndUpdate({_id: result.id} ,{name} )

        res.json({
            msg: 'Update Success!',
            user: {
                name, 
                email: newUser.email,
                role: newUser.role
            }
        })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

// const updateAddress = async (req, res) => {
//     try {
//         const result = await auth(req, res)
//         const { address, city, postcode } = req.body

//         const newUser = await Users.findOneAndUpdate({_id: result.id} ,address, city, postcode)

//         res.json({
//             msg: 'Update Success!',
//             user: {
//                 address: newUser.address,
//                 city: newUser.city,
//                 postcode: newUser.postcode
//             }
//         })

//     } catch (err) {
//         return res.status(500).json({ err: err.message })
//     }
// }
