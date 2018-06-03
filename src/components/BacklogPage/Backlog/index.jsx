/**
 * Created by Zerk on 17-Aug-17.
 */

import React from 'react';
import BacklogColumns from './BacklogColumns';
import NavBtn from './NavBtn';
import './styles.scss';


const Backlog = () => {
  let backlogList = null;

  const handleScroll = (type) => {
    const slidesToScroll = 1;
    const backlogListRef = backlogList.getWrappedInstance().child.viewport;
    const viewportWidth = Math.round(
      backlogListRef.getBoundingClientRect().width,
    );
    const slideWidth = viewportWidth / 4;

    if (type === 'prev') {
      backlogListRef.scrollLeft -= slidesToScroll * slideWidth;
    } else {
      backlogListRef.scrollLeft += slidesToScroll * slideWidth;
    }
  };

  return (
    <div className="b-backlog">
      <NavBtn type="prev" onClick={handleScroll} />
      <BacklogColumns
        ref={(x) => {
          backlogList = x;
        }}
      />
      <NavBtn type="next" onClick={handleScroll} />
    </div>
  );
};

export default Backlog;
