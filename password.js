const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updatePasswords() {
    try {
        // 1. 데이터베이스에서 모든 계정을 가져옵니다.
        const accounts = await prisma.accounts.findMany();

        // 2. 각 계정에 대해 비밀번호를 bcrypt로 해시하고 업데이트합니다.
        for (const account of accounts) {
            // 이미 bcrypt 해시된 비밀번호인지 확인하는 조건을 추가할 수 있습니다.
            if (!account.password.startsWith('$2b$')) { // bcrypt 해시의 일반적인 형식 확인
                const hashedPassword = await bcrypt.hash(account.password, 10); // 10은 saltRounds

                // 3. 해시된 비밀번호를 데이터베이스에 업데이트합니다.
                await prisma.accounts.update({
                    where: { id: account.id },
                    data: { password: hashedPassword }
                });

                console.log(`Password for account ${account.username} has been updated.`);
            } else {
                console.log(`Password for account ${account.username} is already hashed.`);
            }
        }

        console.log('Password update process completed.');
    } catch (error) {
        console.error('Error updating passwords:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// 비밀번호 업데이트 함수 실행
updatePasswords();
