/*=====================================================================
  Filename: CangoAnimation-7v01.js
  Rev 7
  By: A.R.Collins
  Description:  This file augments the core Cango object with
                animation methods
  License: Released into the public domain
  latest version at
  <http://www/arc.id.au/>

  Date    Description                                             |By
  --------------------------------------------------------------------
  11May14 First release                                            ARC
  21Jul14 Released as Version 2                                    ARC
  01Dec15 Released as Version 3                                    ARC
  02Feb16 Released as Version 4                                    ARC
  30Mar17 Released as Version 5                                    ARC
  09Jun17 Released as Version 6                                    ARC
  20Feb20 Released as Version 7                                    ARC
  08Nar20 Track requires SVGsegs as argument                       ARC
 =====================================================================*/

var Timeline, Tweener, Track, TrackTweener;

Cango = (function(CangoCore)  // Cango must be declared a global before this file is loaded
{
  "use strict";

  Tweener = class 
  {
    constructor(delay, duration, loopStr)  // interpolates between values held in an array
    {
      this.delay = delay || 0;
      this.dur = duration || 5000;
      this.reStartOfs = 0;
      this.loop = false;
      this.loopAll = false;

      let loopParm = "noloop";

      if (typeof loopStr === 'string')
      {
        loopParm = loopStr.toLowerCase();
      }
      if (loopParm === 'loop')
      {
        this.loop = true;
      }
      else if (loopParm === 'loopall')
      {
        this.loopAll = true;
      }
    }

    getVal(time, vals, keyTimes)
    { 
      // 'vals' is an array of key frame values (or a static number)
      let slabDur,
          slab, 
          frac,
					localTime;

      if (time === 0)       // re-starting after a stop, otherwise this can increase forever (looping is handled here)
      {
        this.reStartOfs = 0;     // reset this to prevent negative times
      }
      localTime = time - this.reStartOfs;       // handles local looping
      if ((localTime > this.dur+this.delay) && (this.dur > 0) && (this.loop || this.loopAll))
      {
        this.reStartOfs = this.loop? time - this.delay : time;      // we will correct external time to re-start
        localTime = 0;          // force re-start at frame 0 now too
      }
      let t = 0;    // t is the actual local time value used for interpolating
      if (localTime > this.delay)    // repeat initial frame (t=0) if there is a delay to start
      {
        t = localTime - this.delay;   // localTime is contrained to 0 < localTime < this.dur
      }

      if (!Array.isArray(vals))    // not an array, just a static value, return it every time
      {
        return vals;
      }
      if (!vals.length)
      {
        return 0;
      }
      if (vals.length === 1)
      {
        return vals[0];
      }
      // we have at least 2 element array of values
      if (t === 0)
      {
        return vals[0];
      }
      if (t >= this.dur)
      {
        return vals[vals.length-1];  // freeze at end value
      }
      const numSlabs = vals.length-1;
      if (!Array.isArray(keyTimes) || (vals.length !== keyTimes.length))
      {
        slabDur = this.dur/numSlabs;
        slab = Math.floor(t/slabDur);
        frac = (t - slab*slabDur)/slabDur;

        return vals[slab] + frac*(vals[slab+1] - vals[slab]);
      }

      // we have keyTimes to play work with copies of arrays
      const values = [].concat(vals);
      const times = [].concat(keyTimes);
      // make sure times start with 0
      if (times[0] !== 0)
      {
        values.unshift(values[0]);
        times.unshift(0);
      }
      // make sure times end with 100
      if (times[times.length-1] !== 100)
      {
        values.push(values[values.length-1]);
        times.push(100);
      }
      let tFrac = t/this.dur;
      let i = 0;
      while ((i < times.length-1) && (times[i+1]/100 < tFrac))
      {
        i++;
      }
      slabDur = (times[i+1]-times[i])/100;
      frac = (tFrac - times[i]/100)/slabDur;    // convert percentage time to fraction

      return values[i] + frac*(values[i+1] - values[i]);
    }
  }

  class BezTrack
  {
    constructor(segVals)  // SVGsegs.values array
    {
      const c = segVals;
      this.segPoints = [{x:c[0], y:c[1]}, {x:c[2], y:c[3]}, {x:c[4], y:c[5]}, {x:c[6], y:c[7]}];
      this.segLength = this._length(this.segPoints);
    }

    /*============================================================================
    * _pointOnCubicBez calculates a point on a cubic Bezier, 'curve' an array of 
    * 4 control points, eg [{x:10,y:20}, {x:50,y:50}, {x:100,y:100}, {x:120,y:100}]. 
    * 'location' is a decimal indicating the fractional distance along the curve. 
    * It should be a number from 0 to 1, inclusive.
    *----------------------------------------------------------------------------*/
    _pointOnCubicBez(curve, location) 
    {	
      let bezx = (t)=>curve[0].x*(1 - t)*(1 - t)*(1 - t)+curve[1].x*3*t*(1 - t)*(1 - t)+
                      curve[2].x*3*t*t*(1 - t)+curve[3].x*t*t*t;
      let bezy = (t)=>curve[0].y*(1 - t)*(1 - t)*(1 - t)+curve[1].y*3*t*(1 - t)*(1 - t)+
                      curve[2].y*3*t*t*(1 - t)+curve[3].y*t*t*t;

      return {x:bezx(location), y:bezy(location)};
    }

    _dist(p1, p2) 
    {
      return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
    }

    _length(curve) 
    {
      var prev = this._pointOnCubicBez(curve, 0),
          tally = 0,
          curLoc = 0,
          direction = 1,
          cur = null;

      while (curLoc < 1) 
      {
        curLoc += (0.005 * direction);
        cur = this._pointOnCubicBez(curve, curLoc);
        tally += this._dist(cur, prev);	
        prev = cur;
      }
      return tally;
    }

    /*======================================================================
    * _gradientAtPoint
    * returns the gradient of the curve at the given location, 
    * which is a decimal between 0 and 1 inclusive.
    *----------------------------------------------------------------------*/
    _gradientAtPoint(curve, location, dir) 
    {
      // dir -1 to the right, 1 to the left
      let p1,	p2;

      if (location > 0.994)
      {
        p1 = this._pointOnCubicBez(curve, location-0.005);
        p2 = this._pointOnCubicBez(curve, location);
      }
      else
      {
        p1 = this._pointOnCubicBez(curve, location);
        p2 = this._pointOnCubicBez(curve, location+0.005);
      }
      const dy = p2.y - p1.y; 
      const dx = p2.x - p1.x;

      return Math.atan2(dy, dir*dx);	
    }

    /*===============================================================================
    * _pointAlongPath finds the point that is 'distance' along the path from start. 
    * This method returns both the x,y location of the point and also its 'location' 
    * (fractional distance along the path).
    *-------------------------------------------------------------------------------*/
    pointAlongPath(curve, location, distance) 
    {
      const direction = distance > 0 ? 1 : -1,
            step = (0.005 * direction);      // 200 steps (0..1)
      let prev = this._pointOnCubicBez(curve, location),
          tally = 0,
          curLoc = location,
          cur = this._pointOnCubicBez(curve, location);

      while (tally < Math.abs(distance)) 
      {
        curLoc += step;
        cur = this._pointOnCubicBez(curve, curLoc);
        tally += this._dist(cur, prev);	
        prev = cur;
      }

      return {point:cur, location:curLoc, distance:distance};
    }
  }

  class LineTrack
  {
    constructor(segVals)   // SVGsegs.values array
    {
      const c = segVals;
      this.segPoints = [{x:c[0], y:c[1]}, {x:c[2], y:c[3]}];
      this.segLength = Math.sqrt((c[2]-c[0])*(c[2]-c[0]) + (c[3]-c[1])*(c[3]-c[1]));
    }

    /*======================================================================
    * _gradientAtPoint
    * returns the gradient of the curve at the given location, 
    * which is a decimal between 0 and 1 inclusive.
   *----------------------------------------------------------------------*/
    _gradientAtPoint(curve, location, dir) 
    {
      // dir -1 to the right, 1 to the left
      const p = this.segPoints,
            dy = p[1].y - p[0].y, 
            dx = p[1].x - p[0].x;

      return Math.atan2(dy, dir*dx);	
    }

    /*===============================================================================
    * _pointAlongPath finds the point that is 'distance' along the path from start. 
    * This method returns both the x,y location of the point and also its 'location' 
    * (fractional distance along the path).
    *-------------------------------------------------------------------------------*/
    pointAlongPath(line, location, distance) 
    {
      const p = this.segPoints;
      const frac = (distance - location)/this.segLength;
      const cur = {x: p[0].x+frac*(p[1].x - p[0].x), y: p[0].y+frac*(p[1].y - p[0].y)};

      return {point:cur, location:frac, distance:distance};
    }
  }

  Track = class 
  {
    constructor(trkData)  // type SVGsegs
    {
      if (!(trkData instanceof SVGsegs))
      {
        console.warn("TypeError: Track argument 0 not SVGsegs");
        return;
      }
      const svgSegsAry = trkData; 
      this.segs = [];
      if (svgSegsAry[0].type !== "M")
      {
        console.warn("Track segments must start with 'M' command")
        return;
      }
      const initPos = svgSegsAry[0].values;
      let pen = svgSegsAry[0].values.slice(0);
      for (let i=1; i<svgSegsAry.length; i++)
      {
        let pts;
        let seg = svgSegsAry[i];
        if (seg.type === "C")
        {
          pts = pen.concat(seg.values);
          this.segs.push(new BezTrack(pts));
          pen = [seg.values[4], seg.values[5]];
        }
        else if (seg.type === "L")
        {
          pts = pen.concat(seg.values);
          this.segs.push(new LineTrack(pts));
          pen = seg.values;
        }
        else if (seg.type === "Z")  
        {
          // check if the path was closed anyway
          if (pen[0] == initPos[0] && pen[1] == initPos[1]) 
            break;
          // make a line segment to close the path
          pts = pen.concat(initPos);
          this.segs.push(new LineTrack(pts));
          break;// should be last segment but if not, make it the last
        }
      }
      const add = (acc, curr)=>acc + curr.segLength;
      this.totalLength = this.segs.reduce(add, 0);
    }
  };

  TrackTweener = class   
  {
    constructor(trk, delay, duration, loopStr)  // interpolates between values held in an array
    {
      if (!trk instanceof Track)
      {
        console.warn("TrackTweener first argument not Track object");
        return;
      }
      this.track = trk;
      this.delay = delay || 0;
      this.dur = duration || 5000;
      this.reStartOfs = 0;
      this.loop = false;
      this.loopAll = false;
      // working property
      this.prevDist = 0;

      let loopParm = "noloop";

      if (typeof loopStr === 'string')
      {
        loopParm = loopStr.toLowerCase();
      }
      if (loopParm === 'loop')
      {
        this.loop = true;
      }
      else if (loopParm === 'loopall')
      {
        this.loopAll = true;
      }

      // calculate lengths of each segment to know which segment keyTimes are in
      this.segEndDist = [];
      let endDist = 0;
      this.track.segs.forEach((seg)=>{
        endDist += seg.segLength;
        this.segEndDist.push(endDist);
      });
    }

    /*=======================================================
    * '_getDist' takes the 'time' the current time along the 
    * timeline and uses the keyTime values and corresponding 
    * dists values to calculate the % distance along the track 
    * this time corresponds to.
    * returns % distance along total track
    *-------------------------------------------------------*/
    _getDist(time, dists=[], keyTimes)
    {
      if (time === 0)       // re-starting after a stop, otherwise this can increase forever (looping is handled here)
      {
        this.reStartOfs = 0;     // reset this to prevent negative times
      }
      let localTime = time - this.reStartOfs;       // handles local looping
      if ((localTime > this.dur+this.delay) && (this.dur > 0) && (this.loop || this.loopAll))
      {
        this.reStartOfs = this.loop? time - this.delay : time;      // we will correct external time to re-start
        localTime = 0;          // force re-start at frame 0 now too
      }
      let t = 0;    // t is the actual local time value used for interpolating
      if (localTime > this.delay)    // repeat initial frame (t=0) if there is a delay to start
      {
        t = localTime - this.delay;   // localTime is constrained to 0 < localTime < this.dur
      }

      if (typeof(dists) == "number")    // not an array, just a static value, return it every time
      {
        if (0<=dists && dists<=100)
          return dists;
        else
        {
          console.warn("TrackTweener.getPos outside the 0..100 range");
          return 0;
        }
      }
      if (!dists.length)
      {
        return 0;
      }
      if (dists.length === 1)
      {
        return dists[0];
      }
      // check all distances are percent of total
      for (let i=0; i<dists.length; i++)
      {
        if (0<=dists && dists<=100)
        {
          console.warn("TrackTweener.getPos outside the 0..100 range");
          return 0;
        }
      }
      // we have at least 2 element array of dists
      if (t === 0)
      {
        return dists[0];
      }
      if (t >= this.dur)
      {
        return dists[dists.length-1];  // freeze at end value
      }
      const numSlabs = dists.length-1;
      if (!Array.isArray(keyTimes) || (dists.length !== keyTimes.length))
      {
        let slabDur = this.dur/numSlabs;
        let slab = Math.floor(t/slabDur);
        let frac = (t - slab*slabDur)/slabDur;

        return dists[slab] + frac*(dists[slab+1] - dists[slab]);
      }

      // we have keyTimes to play work with copies of arrays
      const distances = [].concat(dists);
      const times = [].concat(keyTimes);
      // make sure times start with 0
      if (times[0] !== 0)
      {
        distances.unshift(distances[0]);
        times.unshift(0);
      }
      // make sure times end with 100
      if (times[times.length-1] !== 100)
      {
        distances.push(distances[distances.length-1]);
        times.push(100);
      }
      let tFrac = t/this.dur;
      let i = 0;
      while ((i < times.length-1) && (times[i+1]/100 < tFrac))
      {
        i++;
      }
      let slabDur = (times[i+1]-times[i])/100;
      let frac = (tFrac - times[i]/100)/slabDur;    // convert percentage time to fraction

      return distances[i] + frac*(distances[i+1] - distances[i]);
    }

    _distToPos(currDist)
    {
      // convert a distance along track into a world coord location (get grad too)
      const tLen = this.track.totalLength;
      let currSeg,
          currStart = 0,
          currEnd = 0;
      for (let i=0; i<this.segEndDist.length; i++)
      {
        currSeg = this.track.segs[i];
        currEnd += currSeg.segLength;
        if (currEnd >= currDist) 
          break;
        currStart = currEnd; 
        if (currStart >= tLen && (this.loop || this.loopAll))
        {
          // after resetting to start at seg0 the for loop is exited
          currSeg = this.track.segs[0];
          currEnd = currSeg.segLength;
          currStart = 0;
          currDist -= tLen;  
        }
      }
      // calc distance into segment
      const segDist = currDist - currStart;
      const posObj = currSeg.pointAlongPath(currSeg.segPoints, 0, segDist);
      const dir = (posObj.point.x >= this.prevX)? -1: 1;
      const grad = currSeg._gradientAtPoint(currSeg.segPoints, posObj.location, dir);
      const gradient = (currDist < this.prevDist)? grad - Math.PI: grad;
      
      return {x: posObj.point.x, y:posObj.point.y, gradient: gradient};
    }
      
    /*=============================================================
    * getPos calculates a position along a Track at some specified 
    * time along an animation timeline.
    * 'time' is the specified time (along a Timeline) 
    * 'dists' is an array of distances along track (% total track length), 
    * 'keyTimes' is an array of times to be at each 'dists' val 
    * getPos returns an object {x:, y:, gradient: } representing 
    * world coords of the track position and the track gradient 
    * at that point.
    *-------------------------------------------------------------*/
    getPos(time, dists, keyTimes)
    {
      const tLen = this.track.totalLength;
      // TrackTweener._getDist returns % distance travelled at time 'time' along total track
      const currDist = tLen*this._getDist(time, dists, keyTimes)/100;  // convert to world coord distance

      return this._distToPos(currDist);   // convert to a world coord location and return
    }

    getPosArray(time, spacingAry, dists, keyTimes)
    {
      const tLen = this.track.totalLength;
      const nChar = spacingAry.length+1;    // there are n-1 spaces between n chars
      const posAry = [];
      let objLen = 0;

      objLen = spacingAry.reduce((acc, spc)=> acc += spc, 0);
      // shorten the track so text doesn't run off the end
      const fracLen = (this.loop || this.loopAll)? 1: (tLen-objLen)/tLen;
      // shrink each value in the dists array 
      const newDists = (this.loop || this.loopAll)? dists: dists.map((e)=>fracLen*e);
      // get the tweener._getDist to calc of the current percentage long the track of the first letter
      // convert this to a real distance d
      let d = tLen*this._getDist(time, newDists, keyTimes)/100; // distance along track of first char
      posAry[0] = this._distToPos(d);  
      for (let i=1; i<nChar; i++)
      {
        d += spacingAry[i-1];   // add one letter space to the first char distance
        posAry[i] = this._distToPos(d); // convert the distance to world coords (and gradient)
      }

      return posAry;
    }
  };

  class AnimObj
  { 
    constructor(id, gc, initFn, drawFn, pathFn, options)
    {
      this.id = id;
      this.gc = gc;        // the Cango context to do the drawing
      this.drawFn = drawFn;
      this.pathFn = pathFn;
      this.options = options || {};
      this.currState = {time:0};  // consider as read-only
      this.nextState = {time:0};  // properties can be added to this (becomes the currState after frame is drawn)
      this.gc.ctx.save();
      if (typeof initFn === "function")
      {
        initFn.call(this, this.options);  // call object creation code
      }
      // draw the object as setup by initFn (pathFn not called yet)
      if (typeof this.drawFn === "function")
      {
        this.drawFn.call(this, this.options);   // call user custom function
      }
      else
      {
        console.log("invalid animation draw function");
      }
      this.gc.ctx.restore();  // if initFn makes changes to ctx restore to pre-initFn state
      // now it has been drawn save the currState values (nextState values are generated by pathFn)
      for (let prop in this.nextState)   // if initFn creates new properties, make currState match
      {
        if (this.nextState.hasOwnProperty(prop))
        {
          this.currState[prop] = this.nextState[prop];
        }
      }
    }
  }

  // this is the actual animator that draws the frame
  function drawFrame(timeline)
  {
    const time = Date.now();    // use this as a time stamp, browser don't all pass the same time code
		let localTime,
				temp,
				prevAt = null,
				clearIt = false;

		if (timeline.prevAnimMode === timeline.modes.STOPPED)
		{
			timeline.startTime = time - timeline.startOfs;   // forces localTime = 0 to start from beginning
		}
		localTime = time - timeline.startTime;
		
		// step through all the animation tasks
		timeline.animTasks.forEach((at)=>{
			if (at.gc.cId !== prevAt)
			{
				// check for new layer, only clear a layer once, there maybe several Cango contexts on each canvas
				clearIt = true;
				prevAt = at.gc.cId;
			}
			at.gc.ctx.save();
			// if re-starting after a stopAnimation reset the currState.time so pathFn doesn't get negative time between frames
			if (timeline.prevAnimMode === timeline.modes.STOPPED)
			{
				at.currState.time = 0;    // avoid -ve dT (=localTime-currState.time) in pathFn
			}
      if (clearIt && !at.options.manualClear)
      {
        at.gc.clearCanvas();
      }
			if (typeof(at.pathFn) === 'function')  // static objects may have null or undefined
			{
				at.pathFn.call(at, localTime, at.options);
			}
      if (typeof at.drawFn === "function")
      {
          at.drawFn.call(at, at.options);
      }
			clearIt = false;
			at.gc.ctx.restore(); // if pathFn changes any ctx properties restore to pre pathFn state
			// now swap the currState and nextState vectors (pathFn may use currState to gen nextState)
			temp = at.currState;
			at.currState = at.nextState; // save current state vector, pathFn will use it
			at.nextState = temp;
			// save the draw time for pathFn
			at.currState.time = localTime;  // save the localtime along the timeline for use by pathFn
		});

		timeline.currTime = localTime;      // timestamp of what is currently on screen
 	}
	
	//===============================================================================

  Timeline = class 
  {
    constructor()
    {
      this.animTasks = [];              // each layer can push an AnimObj object in here
      this.timer = null;                // need to save the RAF id for cancelling
      this.modes = {PAUSED:1, STOPPED:2, PLAYING:3, STEPPING:4};     // animation modes
      this.animMode = this.modes.STOPPED;
      this.prevAnimMode = this.modes.STOPPED;
      this.startTime = 0;               // animation start time (relative to 1970)
      this.startOfs = 0;                // used if play calls with non-zero start time
      this.currTime = 0;                // timestamp of frame on screen
      this.stepTime = 50;               // animation step time interval (in msec)
      this.frameRate = undefined;       // if undefined free run using RAF utility
      this.interval = 0;                // recalulated from frameRate each playAnimation call
    }

    stopAnimation()
    {
      clearTimeout(this.timer);                  // if frameRate set kill timeout
      window.cancelAnimationFrame(this.timer);   // if no frameRate kill RAF 
      this.prevAnimMode = this.animMode;
      this.animMode = this.modes.STOPPED;
      // reset the currTime so play and step know to start again
      this.currTime = 0;
      this.startOfs = 0;
    }

    pauseAnimation()
    {
      clearTimeout(this.timer);                  // if frameRate set kill timeout
      window.cancelAnimationFrame(this.timer);   // if no frameRate kill RAF 
      this.prevAnimMode = this.animMode;
      this.animMode = this.modes.PAUSED;
    }

    stepAnimation()
    {
      // this is the actual animator that draws the frame
      const drawIt = ()=>{
        drawFrame(this);
        this.prevAnimMode = this.modes.PAUSED;
        this.animMode = this.modes.PAUSED;
      }

      // eqivalent to play for one frame and pause
      if (this.animMode === this.modes.PLAYING)
      {
        return;
      }
      if (this.animMode === this.modes.PAUSED)
      {
        this.startTime = Date.now() - this.currTime;  // move time as if currFrame just drawn
      }
      this.prevAnimMode = this.animMode;
      this.animMode = this.modes.STEPPING;

      setTimeout(drawIt, this.stepTime);
    }

    redrawAnimation()
    {
      // eqivalent to play for one frame and pause
      if (this.animMode === this.modes.PLAYING)
      {
        return;
      }
      this.startTime = Date.now() - this.currTime;  // move time as if currFrame just drawn

      drawFrame(this);
    }

    playAnimation(startOfs, stopOfs)
    {
      let timeDiff = 0;
      // this is the actual animator that draws each frame
      const drawIt = ()=>{
        drawFrame(this);
        this.prevAnimMode = this.modes.PLAYING;
        if (stopOfs && this.currTime >= stopOfs)
        {
          this.stopAnimation();     // go back to start of time line
        }
        else
        {
          if (this.frameRate)
          {
            this.interval = 1000/this.frameRate;  // msec
            this.currTime += this.interval;
            timeDiff = (Date.now() - this.startTime) - this.currTime;
            this.timer = setTimeout(drawIt, this.interval - timeDiff);
          }
          else
          {
            this.timer = window.requestAnimationFrame(drawIt);   // go forever
          }
        }
      }

      this.startOfs = startOfs || 0;
      if (this.animMode === this.modes.PLAYING)
      {
        return;
      }
      if (this.animMode === this.modes.PAUSED)
      {
        this.startTime = Date.now() - this.currTime;  // move time as if currFrame just drawn
      }
      this.prevAnimMode = this.animMode;
      this.animMode = this.modes.PLAYING;

      this.timer = window.requestAnimationFrame(drawIt);
    }
  };
	
	//===============================================================================

  CangoCore.prototype.animation = function(init, draw, path, options)
  {
    const animId = this.cId+"_"+this.getUnique();
    const animObj = new AnimObj(animId, this, init, draw, path, options);

    // push this into the Cango animations array
    this.stopAnimation();   // make sure we are not still running an old animation
    this.bkgCanvas.timeline.animTasks.push(animObj);

    return animObj.id;   // so the animation just created can be deleted if required
  };

  CangoCore.prototype.pauseAnimation = function()
  {
    this.bkgCanvas.timeline.pauseAnimation();
  };

  CangoCore.prototype.playAnimation = function(startTime, stopTime)
  {
    this.bkgCanvas.timeline.playAnimation(startTime, stopTime);
  };

  CangoCore.prototype.stopAnimation = function()
  {
    this.bkgCanvas.timeline.stopAnimation();
  };

  CangoCore.prototype.stepAnimation = function()
  {
    this.bkgCanvas.timeline.stepAnimation();
  };

  CangoCore.prototype.redrawAnimation = function()
  {
    this.bkgCanvas.timeline.redrawAnimation();
  };

  CangoCore.prototype.deleteAnimation = function(animId)
  {
    this.pauseAnimation();   // pause all animations
    this.bkgCanvas.timeline.animTasks.forEach((task, idx)=>{
      if (task.id === animId)
      {
        this.bkgCanvas.timeline.animTasks.splice(idx, 1);       // delete the animation object
        return;
      }
    });
  };

  CangoCore.prototype.deleteAllAnimations = function()
  {
    this.stopAnimation();
    this.bkgCanvas.timeline.animTasks = [];
  };



  return CangoCore;    // return the augmented Cango object, over-writing the existing

}(Cango));     // Take the existing Cango object and add animation methods

