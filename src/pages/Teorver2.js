import React, {useState, useEffect} from "react"
import {viborka2} from './viborka2'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

export const Teorver2 = () => {
  const [tab, setTab] = useState([])
  const [vibArr, setVibArr] = useState([])
  const [vibArr2, setVibArr2] = useState([])
  const [flag, setFlag] = useState(true)
  const [lyamda, setLyamda] = useState(0)
  const [funArr, setFunArr] = useState([])
  const [sampleAverage, setSampleAverage] = useState(0)
  const [sampleVariance1, setSampleVariance1] = useState(0)
  const [conIntForMathExp3, setConIntForMathExp3] = useState(0)
  const [conIntForMathExp4, setConIntForMathExp4] = useState(0)
  const [conIntForVariance3, setConIntForVariance3] = useState(0)
  const [conIntForVariance4, setConIntForVariance4] = useState(0)
  const [statThresholdPerson2, setStatThresholdPerson2] = useState(0)
  const [critThresholdPerson2, setCritThresholdPerson2] = useState(0)
  const a = 0.5

  const mathematicalExpectation = a**-1

  const variance = a**-2

  const n = 350

  const density = (x) => {
    return a * Math.exp(-a * x)
  }

  const functionDistributions = (x) => {
    return 1 - Math.exp(-a * x)
  }

  const functionDistributions2 = (x, a) => {
    return 1 - Math.exp(-a * x)
  }

  useEffect(() => {
    if(flag){
      const vib = viborka2.sort((a, b) => { return a - b })
      let data = []
      let min = vib[0]
      let max = vib[vib.length - 1]
      let a = (max - min) / 10
      let a2 = min + a
      let arr =[]
      vib.map((num) => {
        if(arr.length === 0)
          arr = [
            {
              name:  (min + a / 2).toFixed(4),
              quantity: 1,
              density: density((min + a / 2).toFixed(4)),
              density2: 1 / 331
            }
          ]
        else if(num <= a2)
          arr[arr.length - 1] = {
            name:  arr[arr.length - 1].name,
            quantity: arr[arr.length - 1].quantity + 1,
            density: density(arr[arr.length - 1].name),
            density2: (arr[arr.length - 1].quantity + 1) / 331
          }
          else{ 
            arr = [
              ...arr,
              {
                name:  (a2 + a / 2).toFixed(4),
                quantity: 1,
                density: density((a2 + a / 2).toFixed(4)),
                density2: 1 / 331
              }
            ]
            data = [
              ...data,
              {
                inter1: a2 - a,
                inter2: a2
              }
            ]
            a2 += a
          }  
        })
        data = [
          ...data,
          {
            inter1: a2 - a,
            inter2: max
          }
        ]
        arr.map((num, index) => {
          data[index] = {
            ...data[index],
            quantity: num.quantity
          }
        })
        setTab(data)
        setVibArr(arr)
      a = 0.1
        a2 = min
        arr =[]
        while(a2 < vib[vib.length - 1]) {
          arr = [
            ...arr,
            {
              name:  a2.toFixed(4),
              density: density(a2),
              function: functionDistributions(a2)
            }
          ]
          a2 += a
        }
        arr = [
          ...arr,
          {
            name:  vib[vib.length - 1].toFixed(4),
            density: density(vib[vib.length - 1]),
            function: functionDistributions(vib[vib.length - 1])
          }
        ]
        setFunArr(arr)
        let X = 0
        viborka2.map((num) => { X += num })
        X /= n
        setLyamda(1/ X)
        setSampleAverage(X)
        let S2 = 0
        viborka2.map((num) => { S2 += (num - X)**2 })
        S2 /= n
        setSampleVariance1(S2)

        let conMath3 = X - 2.326 * Math.sqrt(S2 / n)
        let conMath4 = X + 2.326 * Math.sqrt(S2 / n)
        setConIntForMathExp3(conMath3)
        setConIntForMathExp4(conMath4)

        let M4 = 0
        viborka2.map((num) => { M4 += (num - X)**4 })
        M4 /= n
        
        let conVar3 = S2 - 2.326 * Math.sqrt((M4 - S2**2) / n)
        let conVar4 = S2 + 2.326 * Math.sqrt((M4 - S2**2) / n)
        setConIntForVariance3(conVar3)
        setConIntForVariance4(conVar4)
        
        a = (max - min) / 10
        a2 = min + a
        arr = []
        data = []
        vib.map((num) => {
          if(arr.length === 0)
            arr = [
              {
                name:  (min + a / 2).toFixed(4),
                quantity: 1,
                inter1: a2 - a,
                inter2: a2
              }
            ]
          else if(num <= a2)
            arr[arr.length - 1] = {
              name:  arr[arr.length - 1].name,
              quantity: arr[arr.length - 1].quantity + 1,
              inter1: a2 - a,
              inter2: a2
            }
          else{ 
            arr = [
              ...arr,
              {
                name:  (a2 + a / 2).toFixed(4),
                quantity: 1,
                inter1: a2 - a,
                inter2: a2
              }
            ]
           
            a2 += a
          }  
        })

        arr[8] = {
          ...arr[8],
          quantity: arr[8].quantity + arr[9].quantity,
          inter2: arr[9].inter2,
          name: arr[8].inter2.toFixed(4)
        }
        arr.splice(9, 1);
        


        setVibArr2(arr)
        let pk
        let stat2 = 0
        arr.map((num) => {
          pk = functionDistributions2(num.inter2, 1/ X) - functionDistributions2(num.inter1, 1/ X)
          stat2 += (num.quantity - n * pk)**2 / n / pk
        })
        setStatThresholdPerson2(stat2)
        setCritThresholdPerson2(18.475)
    }
    setFlag(false)
  })

    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {setInterval(() =>{ setWidth(window.innerWidth)}, 0.1)})

    return (
      <div style={{alignItems: 'center', justifyContent: 'center'}}>
       <div style={{width: width > 1000 ? 1000: width - 50, fontSize: '14px'}}>
          <ComposedChart
            width={width > 1000 ? 1000: width - 50}
            height={400}
            data={vibArr}
            margin={{
              top: 5,
              right: 15,
              left: -25,
              bottom: 5
            }}>
            <CartesianGrid stroke="#f5f5f5"/>
            <XAxis dataKey="name" scale="band"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="density2" barSize={500} fill="#413ea0"/>
            <Line type="monotone" dataKey="density" stroke="#ff7300" />
          </ComposedChart>
        <ComposedChart
          width={width > 1000 ? 1000: width - 50}
          height={400}
          data={funArr}
          margin={{
          top: 5,
          right: 15,
          left: -25,
          bottom: 5
        }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis/>
          <Tooltip />
          <Line dataKey="function"  fill="#F28511" />
          <Line dataKey="density"  fill="#05F976" />
        </ComposedChart>
        </div>
      
        <div style={{marginLeft: 20, marginRight: 20}}>
        <table style={{ width: '100%', textAlign: 'left'}}>
          <tr><th>Математическое ожидание:</th><td style={{textAlign: 'center'}} colspan="2">{mathematicalExpectation}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Дисперсия:</th><td style={{textAlign: 'center'}} colspan="2">{variance}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Выборочное среднее:</th><td style={{textAlign: 'center'}} colspan="2">{sampleAverage.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Выборочная дисперсия:</th><td style={{textAlign: 'center'}} colspan="2"> {sampleVariance1.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Оценка параметра:</th><td style={{textAlign: 'center'}} colspan="2"> {lyamda.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Доверительный интервал для MX при неизвестной DX:</th><td style={{textAlign: 'center'}}>{conIntForMathExp3.toFixed(4)}</td><td style={{textAlign: 'center'}}>{conIntForMathExp4.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Доверительный интервал для DX при неизвестном MX:</th><td style={{textAlign: 'center'}}>{conIntForVariance3.toFixed(4)}</td><td style={{textAlign: 'center'}}>{conIntForVariance4.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          </table>
          <div style={{width: width > 1000 ? 1000: width - 50, fontSize: '14px', marginLeft: -20, marginRight: -20}}>
          <ComposedChart
            width={width > 1000 ? 1000: width - 50}
            height={400}
            data={vibArr2}
            margin={{
              top: 5,
              right: 15,
              left: -25,
              bottom: 5
            }}>
            <CartesianGrid stroke="#f5f5f5"/>
            <XAxis dataKey="name" scale="band"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="quantity" barSize={500} fill="#413ea0"/>
          </ComposedChart>
        </div>
        <table style={{ width: '100%', textAlign: 'left'}}>
          <tr><th>Статистика и порог критерия Пирсона при неизвестных параметрах распределения:</th><td style={{textAlign: 'center'}}>{statThresholdPerson2.toFixed(4)}</td><td style={{textAlign: 'center'}}>{critThresholdPerson2}</td></tr>
          <div style={{marginBottom: 10}}/>
        </table>
          <table style={{ width: '100%', textAlign: 'center'}}>
          <tr><th>Левые границы интервалов</th><th>Правые границы интервалов</th><th>Частоты попадания в интервалы</th></tr>
          {
            tab.map((num) => {
              return(
                <tr><td>{num.inter1.toFixed(4)}</td><td>{num.inter2.toFixed(4)}</td><td>{num.quantity}</td></tr>
              )
            })
          }
        </table>
          </div>
    </div>
  )
}
