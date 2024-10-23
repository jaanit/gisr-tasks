// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   // Type the expected request body
//   interface InjectedPPT {
//     filename: string;
//   }

//   const body = req.body as InjectedPPT; // Type assertion for safety

//   if (!body.filename) {
//     return res.status(400).json({ message: 'Missing filename' });
//   }

//   try {
//     // Create the injected file record with type safety
//     const injectedFile = await prisma.injectedFile.create({
//       data: {
//         filename: body.filename,
//         userId: req.user?.id, // Link to user if using authentication
//       },
//     });

//     console.log('Injected file:', injectedFile);

//     res.status(200).json({ message: 'File injected successfully' });
//   } catch (error) {
//     console.error('Injection error:', error);
//     res.status(500).json({ message: 'Injection failed' });
//   }
// };

// export default handler;
