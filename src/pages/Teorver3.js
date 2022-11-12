import React, {useState, useEffect} from "react"
import {viborka3} from './viborka3'
import {viborka4} from './viborka4'
import {
  ScatterChart, ComposedChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line
} from "recharts"




export const Teorver3 = () => {

  const [flag, setFlag] = useState(true)
  const [sampleAverage1, setSampleAverage1] = useState(0)
  const [sampleAverage2, setSampleAverage2] = useState(0)
  const [sampleVariance1, setSampleVariance1] = useState(0)
  const [sampleVariance2, setSampleVariance2] = useState(0)
  const [karelyaciya, setKarelyaciya] = useState(0)
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [chastoty, setChastoty] = useState([])
  const [chastoty2, setChastoty2] = useState([])
  const [statThresholdPerson, setStatThresholdPerson] = useState(0)
  const [critThresholdPerson, setCritThresholdPerson] = useState(0)
  const [statThresholdKarel, setStatThresholdKarel] = useState(0)
  const [critThresholdKarel, setCritThresholdKarel] = useState(0)
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)
  const [d, setD] = useState(0)
  const [lines, setLines] = useState(0)

  const n = 325
    
    useEffect(() => {
      if(flag){
        

        let dat = []
        let vib = viborka3
            vib.map((num) => {
              dat = [
                ...dat,
                {
                  x: num,
                  y: 0
                }
              ]})
              
    
            vib = viborka4
              vib.map((num, index) => {
                dat[index] = {
                  ...dat[index],
                  
                    y: num
                  
                }
              })
              setData(dat)

          let X = 0
          viborka3.map((num) => { X += num })
          X /= viborka3.length
          setSampleAverage1(X)
          let S2X = 0
          viborka3.map((num) => { S2X += (num - X)**2 })
          S2X /= viborka4.length
          setSampleVariance1(S2X)

          let Y = 0
          viborka4.map((num) => { Y += num })
          Y /= viborka3.length
          setSampleAverage2(Y)
          let S2Y = 0
          viborka4.map((num) => { S2Y += (num - Y)**2 })
          S2Y /= viborka4.length
          setSampleVariance2(S2Y)

          let sum = 0
          dat.map((num) => { sum += (num.x - X) * (num.y - Y)})

          let rxy = sum / Math.sqrt(S2X * S2Y) / n
          setKarelyaciya(rxy)


          let a = rxy * Math.sqrt(S2Y / S2X)
          let b = Y - X * rxy * Math.sqrt(S2Y / S2X)
          let c = rxy * Math.sqrt(S2X / S2Y)
          let d = X - Y * rxy * Math.sqrt(S2X / S2Y)
  
          setA(a)
          setB(b)
          setC(c)
          setD(d)
  
          let lines = [{ x: 0, Y: a * 0 + b},
            { x: 12, Y: a * 12 + b },
            { x: c * -12 + d, Y2: -12},
            { x: c * 12 + d, Y2: 12 } ]
            setLines(lines)





          vib = [...viborka4]
          vib.sort((a, b) => { return a - b })
          let min = vib[0]
          let max = vib[vib.length - 1]
          let a1 = (max - min) / 10
          let a2 = max
          let arr = []

          for(let i = 0; i < 9; ++i){
            arr = [
              ...arr,
              [
                {pY1: a2 - a1, pY2: a2},
                {pY1: a2 - a1, pY2: a2},
                {pY1: a2 - a1, pY2: a2},
                {pY1: a2 - a1, pY2: a2},
                {pY1: a2 - a1, pY2: a2},
                {pY1: a2 - a1, pY2: a2},
                {pY1: a2 - a1, pY2: a2},
                {pY1: a2 - a1, pY2: a2},
                {pY1: a2 - a1, pY2: a2},
                {pY1: a2 - a1, pY2: a2}
              ]
            ]
            a2 -= a1;
          }
          arr = [
            ...arr,
            [
              {pY1: min, pY2: a2},
              {pY1: min, pY2: a2},
              {pY1: min, pY2: a2},
              {pY1: min, pY2: a2},
              {pY1: min, pY2: a2},
              {pY1: min, pY2: a2},
              {pY1: min, pY2: a2},
              {pY1: min, pY2: a2},
              {pY1: min, pY2: a2},
              {pY1: min, pY2: a2}
            ]
          ]

          vib = [...viborka3]
          vib.sort((a, b) => { return a - b })
          min = vib[0]
          max = vib[vib.length - 1]
          a1 = (max - min) / 10
          a2 = min


          for(let i = 0; i < 10; ++i){
            arr[i] = [
              
                {...arr[i][0], pX1: a2, pX2: a2 + a1, quantity: 0},
                {...arr[i][1], pX1: a2 + a1, pX2: a2 + a1*2, quantity: 0},
                {...arr[i][2], pX1: a2 + a1*2, pX2: a2 + a1*3, quantity: 0},
                {...arr[i][3], pX1: a2 + a1*3, pX2: a2 + a1*4, quantity: 0},
                {...arr[i][4], pX1: a2 + a1*4, pX2: a2 + a1*5, quantity: 0},
                {...arr[i][5], pX1: a2 + a1*5, pX2: a2 + a1*6, quantity: 0},
                {...arr[i][6], pX1: a2 + a1*6, pX2: a2 + a1*7, quantity: 0},
                {...arr[i][7], pX1: a2 + a1*7, pX2: a2 + a1*8, quantity: 0},
                {...arr[i][8], pX1: a2 + a1*8, pX2: a2 + a1*9, quantity: 0},
                {...arr[i][9], pX1: a2 + a1*9, pX2: max, quantity: 0}
              
            ]
          }
          
          dat.map((num) => {
            for(let i = 0; i < 10; ++i)
              for(let j = 0; j < 10; ++j)
                if(num.x >= arr[i][j].pX1 && num.x <= arr[i][j].pX2 && num.y >= arr[i][j].pY1 && num.y <= arr[i][j].pY2)
                  arr[i][j] = {
                    ...arr[i][j],
                    quantity: arr[i][j].quantity + 1
                  }     
          })
          let sum1 = 0

          for(let i = 0; i < 5; ++i)
          for(let j = 0; j < 5; ++j)
          sum1 += arr[i][j].quantity
          let sum2 = 0
          for(let i = 0; i < 5; ++i)
          for(let j = 5; j < 10; ++j)
          sum2 += arr[i][j].quantity
          let sum3 = 0
          let i = 5
          for(let j = 0; j < 5; ++j)
          sum3 += arr[i][j].quantity
          let sum4 = 0
          for(let j = 5; j < 10; ++j)
          sum4 += arr[i][j].quantity
          let sum5 = 0
          for(let i = 6; i < 10; ++i)
          for(let j = 0; j < 5; ++j)
          sum5 += arr[i][j].quantity
          let sum6 = 0
          for(let i = 6; i < 10; ++i)
          for(let j = 5; j < 10; ++j)
          sum6 += arr[i][j].quantity

          let arr2 = [
            [{ quantity: sum1},
            { quantity: sum2}],
            [{ quantity: sum3},
            { quantity: sum4}],
            [{ quantity: sum5},
            { quantity: sum6}]
        ]      
            setChastoty(arr)
            setChastoty2(arr2)

            let ni = [arr2[0][0].quantity + arr2[1][0].quantity + arr2[2][0].quantity, arr2[0][1].quantity + arr2[1][1].quantity + arr2[2][1].quantity]
            let nj = [arr2[0][0].quantity + arr2[0][1].quantity, arr2[1][0].quantity + arr2[1][1].quantity, arr2[2][0].quantity + arr2[2][1].quantity]

            let stat = -1

            for(let i = 0; i < 2; ++i)
            for(let j = 0; j < 3; ++j)
            stat += arr2[j][i].quantity**2 / ni[i] / nj[j]

            setStatThresholdPerson(stat * n)
            setCritThresholdPerson(5.991)

            let stat2 = rxy * Math.sqrt((n - 2) / (1 - rxy**2))

            setStatThresholdKarel(stat2)
            setCritThresholdKarel(1.96)

           
            dat = []
            vib = viborka3
            vib.map((num) => {
              dat = [
                ...dat,
                {
                  y: a * num + b,
                }
              ]})
            vib = viborka4
              vib.map((num, index) => {
                dat[index] = {
                  ...dat[index],
                    x: c * num + d
                }
              })
              setData2(dat)

              

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
          height={500}
          margin={{
          top: 5,
          right: 15,
          left: -25,
          bottom: 5
        }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x"/>
          <YAxis type="number"/>
          <Tooltip/>
          <Scatter dataKey="y" data={data} fill="#8884d8" />
          <Line  data={lines} dataKey="Y" stroke="orange" dot={false}/>
          <Line  data={lines} dataKey="Y2" stroke="orange" dot={false}/>

          {/*<Scatter name="" data={data2} fill="#f86" />*/}
        </ComposedChart>
        </div>
        <div style={{width: width > 1000 ? 1000: width - 50}}>
        <div style={{marginLeft: 20, marginRight: 20}}>
        <table style={{ width: '100%', textAlign: 'left'}}>
          <tr><th>Выборочное среднее для компонент X:</th><td style={{textAlign: 'center'}} colspan="2">{sampleAverage1.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Выборочное среднее для компонент Y:</th><td style={{textAlign: 'center'}} colspan="2">{sampleAverage2.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Выборочная дисперсия для компонент X:</th><td style={{textAlign: 'center'}} colspan="2">{sampleVariance1.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Выборочная дисперсия для компонент Y:</th><td style={{textAlign: 'center'}} colspan="2"> {sampleVariance2.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Выборочный коэффициент корреляции:</th><td style={{textAlign: 'center'}} colspan="2"> {karelyaciya.toFixed(4)}</td></tr>
          </table>
          
          <table style={{ width: '100%', textAlign: 'center', tableLayout: 'fixed'}}>
          
          {chastoty.map((num) => {
              return(<tr>{num.map((num) => {return(<td>{ num.quantity}</td>)})}</tr>)})}

        </table>
        <table style={{ width: '100%', textAlign: 'center', tableLayout: 'fixed'}}>
          
          {chastoty2.map((num) => {
              return(<tr>{num.map((num) => {return(<td>{ num.quantity}</td>)})}</tr>)})}

        </table>
        <table style={{ width: '100%', textAlign: 'left'}}>
        <div style={{marginBottom: 10}}/>
          <tr><th>Статистика и порог критерия Пирсона:</th><td style={{textAlign: 'center'}}> {statThresholdPerson.toFixed(4)}</td><td style={{textAlign: 'center'}}> {critThresholdPerson}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Статистика и порог критерия значимости коэффициента корреляции:</th><td style={{textAlign: 'center'}}> {statThresholdKarel.toFixed(4)}</td><td style={{textAlign: 'center'}}> {critThresholdKarel}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Эмпирическое уравнение регрессии Y на X: y=ax+b:</th><td style={{textAlign: 'center'}} colspan="2"> y = {a.toFixed(4)}x {b.toFixed(4)}</td></tr>
          <div style={{marginBottom: 10}}/>
          <tr><th>Эмпирическое уравнение регрессии X на Y: x=cy+d:</th><td style={{textAlign: 'center'}} colspan="2"> x = {c.toFixed(4)}y +{d.toFixed(4)}</td></tr>
        </table>
          </div>
      </div>
    </div>
  )
}
