export default async function getUserId(){
    const res = await fetch('http://localhost:9999/board/1')

    return res.json()
}