Vec3 = function(x,y,z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}

Vec3.prototype.add = function(v)
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}

Vec3.prototype.sum = function()
{
    return this.x + this.y + this.z;
}


Vec3.prototype.min = function()
{
    var min = x;
    if(y<min) min = y;
    if(z<min) min = z;

    return min;
}


Vec3.prototype.max = function()
{
    var max = x;
    if(y>max) max = y;
    if(z>max) max = z;

    return max;
}

Vec3.prototype.mid = function()
{
    var mid = x;
    if(mid == max || mid == min) mid = y;
    if(mid == max || mid == min) mid = z;

    return mid;
}

var sub = function(v0,v1)
{
    v1.x -= v0.x;
    v1.y -= v0.y;
    v1.z -= v0.z;

    return v1;
}

var AreaOfTriangle = function(v0v1,v0v2)
{
    v0v1_abs = Math.sqrt(v0v1.x**2+v0v1.y**2+v0v1.z**2);
    v0v2_abs = Math.sqrt(v0v2.x**2+v0v2.y**2+v0v2.z**2);
    
    v0v1v0v2 = v0v1.x*v0v2.x + v0v1.y*v0v2.y + v0v1.z*v0v2.z;
   
    
    s = (Math.sqrt(((v0v1_abs**2)*(v0v2_abs**2))-(v0v1v0v2**2)))/2

    return s;
}
    
