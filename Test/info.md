- cd Visualizer
- python -m http.server

```
 animateY(obj1, obj2, arrows, dir) {
    return new Promise((resolveY) => {
      const startY1 = obj1.yPos, startY2 = obj2.yPos;
      let t = 0;
      const animate = () => {
        t = Math.min(t + this.AnimationSpeed, 1);
        obj1.yPos = lerp(startY1, startY1 + (dir * 40), t);
        obj2.yPos = lerp(startY2, startY2 - (dir * 40), t);
        clearCanvas();
        DrawArray(arrows);
        if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
        else resolveY();
      };
      animate();
    });
  };

  async swapAnimation(obj1, obj2, arrows) {
    const startX1 = obj1.xPos, startX2 = obj2.xPos;
    let t = 0;
    const animate = () => {
      return new Promise(resolve => {
        const swap = () => {
          t = min(t + this.AnimationSpeed, 1);
          obj1.xPos = lerp(startX1, startX2, t);
          obj2.xPos = lerp(startX2, startX1, t);
          clearCanvas();
          DrawArray(arrows);
          if (t < 1 && this.isAnimating) requestAnimationFrame(swap);
          else resolve();
        };
        swap();
      });
    };

    await this.animateY(obj1, obj2, arrows, +1);
    await this.delay(this.TimeoutDelay);
    await animate();
    await this.delay(this.TimeoutDelay);
    await this.animateY(obj1, obj2, arrows, -1);
  };
  ```

  ```
  sorting data: 29, 10, 14, 37, 13, 25, 1, 17, 5, 8
  graph data: 
  V = A, B, C, D, E, F, G, H, I, J
  E = (A-B), (A-C), (B-E), (C-F), (E-F), (E-G), (G-H), (F-H), (H-I), (I-J), (J-G)

  ```