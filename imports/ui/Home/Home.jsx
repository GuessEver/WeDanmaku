import React from 'react'
import { render } from 'react-dom'

import {
  Hero,
  Image,
  Tiles, Tile,
  Card
} from 'grommet'

const HeaderImage = (props) => <Image src={`../../assets/A.png`} fit={`cover`}/>

const test = () => {
  let arr = []
  for (let i = 0; i < 100; i++) arr.push(i)
  return arr
}

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Hero background={<HeaderImage/>} size={`small`}/>
        <Tiles>
          <Tile>
            <Card label={`dsfd`}>f</Card>
          </Tile>
        </Tiles>
      </div>
    )
  }
}
