import { katputli } from '@modules/api';
import { ApiResponse, Query } from '@project-types';
import { NextApiHandler } from 'next';

const handler: NextApiHandler<ApiResponse> = async (req, res) => {
  if (req.method === 'GET') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, \
Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    );
    try {
      const katputliRes = await katputli(req.query as Query);
      return res.status(200).json({ isSuccessful: true, data: katputliRes });
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error',
        isSuccessful: false,
        err: String(err),
      });
    }
  } else {
    return res
      .status(405)
      .json({ isSuccessful: false, message: 'Method not allowed' });
  }
};

export default handler;
