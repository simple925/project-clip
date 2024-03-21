// 20240317 백지연 
// TO DO: api 사용에 대한 논의 필요 (getData는 getUserId.ts와 로직 동일)

/**
 * [데이터 가져오기] 
 * 
 * @param url 해당 데이터베이스 서버 주소
 * @param id 해당 데이터베이스 서버에서 가져올 특정 id
 * @returns json 형태의 데이터
 * @description 해당 url의 데이터를 가져와 json 형태로 반환한다
 */
async function getData(url: string, id?: number): Promise<any> {
  const fetchUrl = id ? `${url}?id=${id}` : url;
  console.log('*데이터 url 확인: ', fetchUrl)
  // id가 있을 경우, url의 id 값으로 조회
  // id가 없을 경우, url만 조회
  const res = await fetch(fetchUrl);
  if (!res.ok) throw new Error('데이터 fetch 실패!');
  const result = await res.json();
  return result;
}

export default getData