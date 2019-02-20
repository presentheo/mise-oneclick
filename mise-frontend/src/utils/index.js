  // 평균값 구하기
  export const getAverage = (arr, key) => {
    let result = arr.reduce((acc, cur) => {
      if (cur[key] === '-'){
        cur[key] = 0;
      }
      acc += cur[key]*1
      return acc
    }, 0)
    result = Math.floor(result/arr.length);
    return result
  }

  // 등급 구하기
  export const getPm10Grade = (value) => {
    if (value >= 0 && value <= 30){
      return '좋음'
    }else if (value >= 31 && value <= 80){
      return '보통'
    }else if (value >= 81 && value <= 100){
      return '나쁨'
    }else if (value >= 101){
      return '매우나쁨'
    }
  }
