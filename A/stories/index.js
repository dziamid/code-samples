import React from 'react';
import { storiesOf } from '@kadira/storybook';
import A from '../index';


storiesOf('A', module)
  .add('default', () => (
    <p>
      Lorem ipsum dolor sit amet <A title="consectetur">consectetur</A> adipiscing elit.
    </p>
  ))
  .add('footer color', () => (
    <p>
      Lorem ipsum dolor sit amet <A footer title="consectetur">consectetur</A> adipiscing elit.
    </p>
  ));
