//シーンを作成する
var scene=new THREE.Scene();
//カメラを作成する
var camera=new THREE.PerspectiveCamera(10,window.innerWidth / window.innerHeight,0.1,1000);
//カメラの位置
camera.position.z=0;
camera.position.x=0;
camera.position.y=0;

//レンダラーを作成する（基本WebGL、非対応の場合は2DCanvas）
try {
  var renderer = new THREE.WebGLRenderer({alpha:true});
} catch (e) {
  var renderer = new THREE.CanvasRenderer({alpha:true});
}

//星型のシェイプを作成
var starShape = new THREE.Shape();
var x = -25;
var y = -25;
starShape.moveTo( x+25, y+0 );
starShape.lineTo( x+17.27, y+15.65 );
starShape.lineTo( x+0, y+18.16 );
starShape.lineTo( x+12.5, y+30.35 );
starShape.lineTo( x+9.55, y+47.55 );
starShape.lineTo( x+25, y+39.43 );
starShape.lineTo( x+40.45, y+47.55 );
starShape.lineTo( x+37.5, y+30.35 );
starShape.lineTo( x+50, y+18.16 );
starShape.lineTo( x+32.73, y+15.65 );
starShape.lineTo( x+25, y+0 );

//シェイプをジオメトリ（形状）化する
var geometry = new THREE.ShapeGeometry( starShape );
//マテリアルを定義する（今回の場合は面を着色）
var material = new THREE.MeshBasicMaterial( {color: 0x00a5de, side: THREE.DoubleSide} );

//星を500個作る
starNum = 500;
//グループを作成
group = new THREE.Group();

for (var i = 0; i < starNum; i++) {
	//ジオメトリとマテリアルを指定して、星メッシュを作成する
	var star = new THREE.Mesh(geometry, material);
	//星のサイズを調整
	star.scale.set(0.01, 0.01, 0.01);
	
	//ランダムな角度を設定
	var deg = Math.random() * 360;
	var rad = deg * Math.PI / 180; //ラジアン化
	//半径を設定
	var radius = 40;
	//半径とラジアンからY軸とZ軸の位置を求める
	star.position.y = radius * Math.sin(rad);
	star.position.z = radius * Math.cos(rad);
	//X軸の位置は帯状になるように細めのランダム値を入れる
	star.position.x = Math.random() * 10 - 5;
	//星の面をそれぞれ中心点に向ける（垂直にする）
	star.rotation.x = -deg * (Math.PI / 180);
	//星をグループに追加
	group.add(star);
}

//グループをシーンに追加
scene.add(group);

//レンダリング処理
function render() {
	//グループ全体を回転させる
	group.rotateX((Math.PI / 180) / 40);
	//レンダリング
	renderer.render(scene, camera);
}
//ウィンドウリサイズ時にアスペクト比を維持する処理
function resizeSetSize(){
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();		
}
//HTML読み込み時にレンダリング先のcanvasを追加する
document.addEventListener("DOMContentLoaded", function(event) {
	resizeSetSize();//アスペクト比調整処理を事前に実行
	document.querySelector('.bg-star').appendChild(renderer.domElement);	
});
//リサイズしたらアスペクト比を調整
window.addEventListener("resize", resizeSetSize);

//50fpsでレンダリングをする
window.setInterval(render, 20);
