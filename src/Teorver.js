import React, {useState, useEffect} from "react"
import {viborka} from './viborka'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts"

export const Teorver = () => {
    const [vibArr, setVibArr] = useState([])
    const [vibArr2, setVibArr2] = useState([])
    const [funArr, setFunArr] = useState([])
    const [tab, setTab] = useState([])
    const[flag, setFlag] = useState(true)
    const[sampleAverage, setSampleAverage] = useState(0)
    const[sampleVariance1, setSampleVariance1] = useState(0)
    const[sampleVariance2, setSampleVariance2] = useState(0)
    const[conIntForMathExp1, setConIntForMathExp1] = useState(0)
    const[conIntForMathExp2, setConIntForMathExp2] = useState(0)
    const[conIntForMathExp3, setConIntForMathExp3] = useState(0)
    const[conIntForMathExp4, setConIntForMathExp4] = useState(0)
    const[conIntForVariance1, setConIntForVariance1] = useState(0)
    const[conIntForVariance2, setConIntForVariance2] = useState(0)
    const[conIntForVariance3, setConIntForVariance3] = useState(0)
    const[conIntForVariance4, setConIntForVariance4] = useState(0)
    const[statThresholdPerson1, setStatThresholdPerson1] = useState(0)
    const[statThresholdPerson2, setStatThresholdPerson2] = useState(0)
    const[critThresholdPerson1, setCritThresholdPerson1] = useState(0)
    const[critThresholdPerson2, setCritThresholdPerson2] = useState(0)

    const mathematicalExpectation = 5.25
    const variance = 1.21
    const n = 325

    const density = (x) => {
      return Math.exp(-((x - mathematicalExpectation)**2) / (2 * variance)) / Math.sqrt(2 * Math.PI * variance) 
    }

    const factorial = (x) => {
      return x ? x * factorial(x - 1) : 1
    }

    const functionErrors = (x) => {
      let erf = x
      let erf2 = 0
      let i = 1
      while(erf !== erf2) {
        erf2 = erf
        erf += ((-1)**i * x**(2 * i + 1)) / (factorial(i) * (2 * i + 1))
        ++i
      }
      return erf * 2 / Math.sqrt(Math.PI)
    }

    const functionDistributions = (x) => {
      return (1 + functionErrors((x - mathematicalExpectation) / Math.sqrt(variance * 2))) / 2
    }

    const functionDistributions2 = (x, m, v) => {
      return (1 + functionErrors((x - m) / Math.sqrt(v * 2))) / 2
    }

    useEffect(() => {
      if(flag){
        const vib = viborka.sort((a, b) => { return a - b })
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
              }
            ]
          else if(num <= a2)
            arr[arr.length - 1] = {
              name:  arr[arr.length - 1].name,
              quantity: arr[arr.length - 1].quantity + 1,
            }
          else{ 
            arr = [
              ...arr,
              {
                name:  (a2 + a / 2).toFixed(4),
                quantity: 1,
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
            inter2: a2,
            quantity: 0
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
        viborka.map((num) => { X += num })
        X /= viborka.length
        setSampleAverage(X)
        let S2 = 0
        viborka.map((num) => { S2 += (num - X)**2 })
        S2 /= viborka.length
        setSampleVariance1(S2)
        setSampleVariance2(S2 * viborka.length / (viborka.length - 1))
        let conMath1 = X - 1.96 * Math.sqrt(variance / n)
        let conMath2 = X + 1.96 * Math.sqrt(variance / n)
        setConIntForMathExp1(conMath1)
        setConIntForMathExp2(conMath2)
        let conMath3 = X - 1.96 * Math.sqrt(S2 / n)
        let conMath4 = X + 1.96 * Math.sqrt(S2 / n)
        setConIntForMathExp3(conMath3)
        setConIntForMathExp4(conMath4)
        let sum = 0
        viborka.map((num) => { sum += (num - mathematicalExpectation)**2 })
        let conVar1 = sum * 2 / (1.96 + Math.sqrt(2 * n - 1))**2
        let conVar2 = sum * 2 / (-1.96 + Math.sqrt(2 * n - 1))**2
        setConIntForVariance1(conVar1)
        setConIntForVariance2(conVar2)
        let conVar3 = n * S2 * 2 / (1.96 + Math.sqrt(2 * (n - 1) - 1))**2
        let conVar4 = n * S2 * 2 / (-1.96 + Math.sqrt(2 * (n - 1) - 1))**2
        setConIntForVariance3(conVar3)
        setConIntForVariance4(conVar4)
        a = (max - min) / 6
        a2 = min + a
        arr = []
        data = []
        vib.map((num) => {
          if(arr.length === 0)
            arr = [
              {
                name:  (min + a / 2).toFixed(4),
                quantity: 1,
              }
            ]
          else if(num <= a2)
            arr[arr.length - 1] = {
              name:  arr[arr.length - 1].name,
              quantity: arr[arr.length - 1].quantity + 1,
            }
          else{ 
            arr = [
              ...arr,
              {
                name:  (a2 + a / 2).toFixed(4),
                quantity: 1,
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
            inter2: a2,
            quantity: 0
          }
        ]
        arr.map((num, index) => {
          data[index] = {
            ...data[index],
            quantity: num.quantity
          }
        })
        setVibArr2(arr)
        let stat1 = 0
        let pk
        data.map((num) => {
          pk = functionDistributions(num.inter2) - functionDistributions(num.inter1)
          stat1 += (num.quantity - n * pk)**2 / n / pk
        })
        setStatThresholdPerson1(stat1)
        let stat2 = 0
        data.map((num) => {
          pk = functionDistributions2(num.inter2, X, S2) - functionDistributions2(num.inter1, X, S2)
          stat2 += (num.quantity - n * pk)**2 / n / pk
        })
        setStatThresholdPerson2(stat2)
        setCritThresholdPerson1(11.07)
        setCritThresholdPerson2(7.815)
      }
      setFlag(false)
    })

    const [width, setWidth] = React.useState(window.innerWidth)

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
            <Bar dataKey="quantity" barSize={500} fill="#413ea0"/>
          </ComposedChart>
        </div>
        <div style={{width: width > 1000 ? 1000: width - 50, fontSize: '14px'}}>
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
          <tr><th>Выборочное среднее:</th><td style={{textAlign: 'center'}} colspan="2">{sampleAverage.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Выборочная дисперсия:</th><td style={{textAlign: 'center'}}> {sampleVariance1.toFixed(4)}</td><td style={{textAlign: 'center'}}> {sampleVariance2.toFixed(4)}</td></tr>
          <tr><th></th><td style={{textAlign: 'center', fontSize: 10}}>(смещенная)</td><td style={{textAlign: 'center', fontSize: 10}}>(несмещенная)</td></tr>
          <tr><th>Доверительный интервал для MX при известной DX:</th><td style={{textAlign: 'center'}}>{conIntForMathExp1.toFixed(4)}</td><td style={{textAlign: 'center'}}>{conIntForMathExp2.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Доверительный интервал для MX при неизвестной DX:</th><td style={{textAlign: 'center'}}>{conIntForMathExp3.toFixed(4)}</td><td style={{textAlign: 'center'}}>{conIntForMathExp4.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Доверительный интервал для DX при известном MX:</th><td style={{textAlign: 'center'}}>{conIntForVariance1.toFixed(4)}</td><td style={{textAlign: 'center'}}>{conIntForVariance2.toFixed(4)}</td></tr>
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
        <table style={{ margin: '0 1000 0 1000', width: '100%', textAlign: 'left'}}>
          <tr><th>Статистика и порог критерия Пирсона при известных параметрах распределения:</th><td style={{textAlign: 'center'}}>{statThresholdPerson1.toFixed(4)}</td><td style={{textAlign: 'center'}}>{critThresholdPerson1}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Статистика и порог критерия Пирсона при неизвестных параметрах распределения:</th><td style={{textAlign: 'center'}}>{statThresholdPerson2.toFixed(4)}</td><td style={{textAlign: 'center'}}>{critThresholdPerson2}</td></tr>
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
