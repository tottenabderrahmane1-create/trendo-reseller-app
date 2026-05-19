import type { NextFunction, Request, Response } from 'express';

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  const expectedToken = process.env.ADMIN_TOKEN;

  if (!header?.startsWith('Bearer ') || !expectedToken) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = header.slice('Bearer '.length);
  if (token !== expectedToken) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  next();
}
