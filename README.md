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



# test data
```sql
INSERT INTO Accounts (id, username, password, created_at, updated_at, last_login, is_deleted, comment) VALUES
('550e8400e29b41d4a716446655440000', 'user1', '$2b$10$8yHh3UvYsm8C5x6I5E8EheFhO8Ael0.A2orXqCCl.D1k/Vb6AUMrO', '2024-07-01 08:00:00', '2024-07-01 08:00:00', '2024-07-05 12:00:00', 0, 'First user account'),
('550e8400e29b41d4a716446655440001', 'user2', '$2b$10$9hHh3UvYsm8C5x6I5E8EheFhO8Ael0.A2orXqCCl.D1k/Vb6AUMrO', '2024-07-02 09:00:00', '2024-07-02 09:00:00', '2024-07-06 13:00:00', 0, 'Second user account'),
('550e8400e29b41d4a716446655440002', 'user3', '$2b$10$0iHh3UvYsm8C5x6I5E8EheFhO8Ael0.A2orXqCCl.D1k/Vb6AUMrO', '2024-07-03 10:00:00', '2024-07-03 10:00:00', '2024-07-07 14:00:00', 0, 'Third user account'),
('550e8400e29b41d4a716446655440003', 'user4', '$2b$10$1jHh3UvYsm8C5x6I5E8EheFhO8Ael0.A2orXqCCl.D1k/Vb6AUMrO', '2024-07-04 11:00:00', '2024-07-04 11:00:00', '2024-07-08 15:00:00', 0, 'Fourth user account'),
('550e8400e29b41d4a716446655440004', 'user5', '$2b$10$2kHh3UvYsm8C5x6I5E8EheFhO8Ael0.A2orXqCCl.D1k/Vb6AUMrO', '2024-07-05 12:00:00', '2024-07-05 12:00:00', '2024-07-09 16:00:00', 0, 'Fifth user account'),
('550e8400e29b41d4a716446655440005', 'user6', '$2b$10$3lHh3UvYsm8C5x6I5E8EheFhO8Ael0.A2orXqCCl.D1k/Vb6AUMrO', '2024-07-06 13:00:00', '2024-07-06 13:00:00', '2024-07-10 17:00:00', 0, 'Sixth user account'),
('550e8400e29b41d4a716446655440006', 'user7', '$2b$10$4mHh3UvYsm8C5x6I5E8EheFhO8Ael0.A2orXqCCl.D1k/Vb6AUMrO', '2024-07-07 14:00:00', '2024-07-07 14:00:00', '2024-07-11 18:00:00', 0, 'Seventh user account'),
('550e8400e29b41d4a716446655440007', 'user8', '$2b$10$5nHh3UvYsm8C5x6I5E8EheFhO8Ael0.A2orXqCCl.D1k/Vb6AUMrO', '2024-07-08 15:00:00', '2024-07-08 15:00:00', '2024-07-12 19:00:00', 0, 'Eighth user account'),
('550e8400e29b41d4a716446655440008', 'user9', '$2b$10$6oHh3UvYsm8C5x6I5E8EheFhO8Ael0.A2orXqCCl.D1k/Vb6AUMrO', '2024-07-09 16:00:00', '2024-07-09 16:00:00', '2024-07-13 20:00:00', 0, 'Ninth user account'),
('550e8400e29b41d4a716446655440009', 'user10', '$2b$10$7pHh3UvYsm8C5x6I5E8EheFhO8Ael0.A2orXqCCl.D1k/Vb6AUMrO', '2024-07-10 17:00:00', '2024-07-10 17:00:00', '2024-07-14 21:00:00', 0, 'Tenth user account');
```