export function angleBetween(){
    let s = self, o = other;
    let calculatedAngle;

    calculatedAngle = Math.round(radialToAngle(Math.atan2(Math.round(s.hb.y - o.hb.y), Math.round(s.hb.x - o.hb.x))));
    
    return calculatedAngle;
}