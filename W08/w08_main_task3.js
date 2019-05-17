function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [ -1,  1, 0 ], // 0
        [ -1, -1, 0 ], // 1
        [  1, -1, 0 ], // 2
	[  1,  1,  0]  // 3
    ];

    var faces = [
        [ 0, 1, 2 ], // f0
	[ 0, 2, 3 ]  // f1
    ];

    var scalars = [
        0.1, // S0
        0.2, // S1
        0.8, // S2
	0.5  // S3
    ];

    //document.write(cmap+'\n');
    // Create color map
    var cmap = [];
    for ( var i = 1; i < 9; i++ )
    {
        var S = (i/10) / 0.8; // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );	
    }

    
    // Draw color map
    var lut = new THREE.Lut( 'rainbow', cmap.length );
    lut.addColorMap( 'mycolormap', cmap );
    lut.changeColorMap( 'mycolormap' );

    //Error
    scene.add( lut.setLegendOn( {
        'layout':'horizontal',
        'position': { 'x': 0.6, 'y': -1.1, 'z': 1.1 },
        'dimensions': { 'width': 0.15, 'height': 0.5 }
    } ) );
    
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial();

    var nvertices = vertices.length;
    for ( var i = 0; i < nvertices; i++ )
    {
        var vertex = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( vertex );
    }

    var nfaces = faces.length;
    //document.write(nfaces);
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var face = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( face );
    }



    //document.write(scalars[0]);
    //document.write(cmap[7][1]);
    // Assign colors for each vertex
    material.vertexColors = THREE.VertexColors;

    for ( var i = 0; i < nfaces; i++ )
    {
	var id = faces[i];
	if(i==0){
	    var S0 = (scalars[ faces[0][0] ]*10) -1;
	    var S1 = (scalars[ faces[0][1] ]*10) -1;
	    var S2 = (scalars[ faces[0][2] ]*10) -1;
	    var C0 = new THREE.Color().setHex( cmap[ S0 ][1] );
	    var C1 = new THREE.Color().setHex( cmap[ S1 ][1] );
	    var C2 = new THREE.Color().setHex( cmap[ S2 ][1] );
	    geometry.faces[i].vertexColors.push( C0 );
	    geometry.faces[i].vertexColors.push( C1 );
	    geometry.faces[i].vertexColors.push( C2 );
	}
	if(i==1){
	    var S0 = (scalars[ faces[0][0] ]*10) -1;
	    var S2 = (scalars[ faces[0][2] ]*10) -1;
	    var S3 = (scalars[ faces[1][2] ]*10) -1;
	    var C0 = new THREE.Color().setHex( cmap[ S0 ][1] );
	    var C2 = new THREE.Color().setHex( cmap[ S2 ][1] );
	    var C3 = new THREE.Color().setHex( cmap[ S3 ][1] );	    
	    geometry.faces[i].vertexColors.push( C0 );
	    geometry.faces[i].vertexColors.push( C2 );
	    geometry.faces[i].vertexColors.push( C3 );
	}

    }
    

    var square = new THREE.Mesh( geometry, material );
    scene.add( square );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        renderer.render( scene, camera );
    }
}
