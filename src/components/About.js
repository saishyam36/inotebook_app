import React, { useContext } from 'react'
import StarRating from './StarRating';
import Accordian from './Accordian';
import { FeatureFlagsContext } from '../feature-flag/context';

export function About() {

  const { loading, enabledFlags } = useContext(FeatureFlagsContext);
  const componentToRender = [
    {
      key: 'starRating',
      component: <StarRating noOfStars={10} />
    },
    {
      key: 'accordian',
      component: <Accordian />
    }
  ]

  const checkEnabledFlags = (getCurrentKey) => {
    return enabledFlags[getCurrentKey]
  }

  if (loading) return <h1>Loading Data...</h1>;


  return (
    <div>
      {
        componentToRender.map((componentItem) => checkEnabledFlags(componentItem.key) ? componentItem.component : null)
      }
    </div>
  );
}


export default About