## Getting Started
```bash
npx next dev
or
npm run dev
```

## DB Started
```
npx json-server --port 9990 ./db/[디비파일명].json
```


## 데이터 암호화 모듈 ex
```
비밀번호 해쉬 방법
import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
```
```
해쉬된 비밀번호 비교
import bcrypt from 'bcrypt';

export async function verifyPassword(plainPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}
```
```
사용자 등록 예
import { hashPassword } from '../../utils/hashPassword';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;

  // 비밀번호 해시
  const hashedPassword = await hashPassword(password);

  // 사용자 생성
  const user = await prisma.accounts.create({
    data: {
      id: '550e8400e29b41d4a716446655440000', // 예제용 UUID, 실제로는 생성해야 합니다.
      username,
      password: hashedPassword,
    },
  });

  res.status(201).json(user);
}
```
```
로그인 예
// pages/api/login.js

import { verifyPassword } from '../../utils/verifyPassword';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;

  // 사용자 찾기
  const user = await prisma.accounts.findUnique({
    where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // 비밀번호 검증
  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // 로그인 성공
  res.status(200).json({ message: 'Login successful' });
}
```