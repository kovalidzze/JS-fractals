var angle0 = (Math.PI/180)*60, //перевод в радианы
    angle1 = (Math.PI/180)*25.7,
    angle2 = (Math.PI/180)*20,
    angle3 = (Math.PI/180)*20,
    angle4 = (Math.PI/180)*60,
    angle5 = (Math.PI/180)*25.7,
    userSelected,
    Depth,
    Step,
    f,
    ygol,
    rotation,
    angleRotation,
    coordinate_x,
    coordinate_y,
    count = 0,
    x,
    y,
    state = [],
    state2 = [],

    f0 = "F++F++F", //аксиома снежинки
    f1 = "F", //аксиома дерева 1
    f2 = "F[", //аксиома дерева 2
    f3 = "F[[", //аксиома дерева 4
    f4 = "FXF--FF--FF", //аксиома треугольника серпинского
    f5 = "X", //аксиома дерева 3
    F0 = "F-F++F-F", //пор.правила снежинки
    F1 = "F[+F]F[-F]F", //пор.правила дерева 1
    F2 = "F[+F]F[-F][F]", //пор.правила дерева 2
    F3 = "-F[-F+F-F]+[+F-F-F]", //пор.правила дерева 4
    F4 = "FF", //пор.правила серпинского для F
    X4 = "--FXF++FXF++FXF--", //пор.правила серпинского для X
    F5 = "FF", //пор.правила дерева 3 для F
    X5 = "F[+X][-X]FX"; //пор.правила дерева 3 для X


  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d'); //ведущий к созданию объекта CanvasRenderingContext2D, представляющий двумерный контекст
  context.canvas.width = 1500;
  context.canvas.height = 800;
  context.lineWidth = "1";
  context.strokeStyle = "black";
  
     

function DrawFractals()
{
   Depthss = document.getElementById('Depths');
   Step = Number(document.getElementById('Step').value);
   Fractal = document.getElementById("Fractals");
   userSelected = Fractal.options[Fractal.selectedIndex].value;
   Depth = Number(Depthss.options[Depthss.selectedIndex].value); 
   coordinate_x = 600;
   coordinate_y = 350;
  
  switch (userSelected) {
      case '0':
      ReadAxiom(f0);
      break;
      
      case '1':
      ReadAxiom(f1);
      break;
      
      case '2':
      ReadAxiom(f2);
      break;
      
      case '3':
      ReadAxiom(f3);
      break;

      case '4':
      ReadAxiom(f4);
      break;

      case '5':
      ReadAxiom(f5);
      break;
      }
}


function ReadAxiom (Axiom)
{
  if (Depth != 0) {
    switch (Axiom) {
      case f0:
        for (var i = 0; i < Depth; i++) {

          f = Axiom.split("F").join(F0);
          Axiom = f;
        }
        ygol = angle0;
        Draw(f,ygol);
      break;
        
      case f1:
        for (var j = 0; j < Depth; j++) {

          f = Axiom.split("F").join(F1);
          Axiom = f;
        }
        ygol = angle1;
        Draw(f,ygol);
      break;
        
      case f2:
        for (var k = 0; k < Depth; k++) {

          f = Axiom.split("F").join(F2);
          Axiom = f;
        }
        ygol = angle2;
        Draw(f,ygol); 
      break;
        
      case f3:
        for (var n = 0; n < Depth; n++) {

          f = Axiom.split("F").join(F3);
          Axiom = f;
        }
        ygol = angle3;
        Draw(f,ygol);    
      break;

      case f4:
        for (var n = 0; n < Depth; n++) {

          f = Axiom.split("F").join(F4);
          var Axiom1 = f;
          f = Axiom1.split("X").join(X4);
          Axiom = f;
        }
        ygol = angle4;
        Draw(f,ygol);    
      break;

      case f5:
        for (var n = 0; n < Depth; n++) {

          f = Axiom.split("X").join(X5);
          var Axiom1 = f;
          f = Axiom1.split("F").join(F5);
          
          Axiom = f;
        }
         window.console.log("f  " + f);
        ygol = angle5;
        Draw(f,ygol);    
      break;
    }
  }
  
   else {
     if (f0)
    {
      f = Axiom;
      ygol = angle0;
      Draw(f,ygol);
    }
     
     else if (f1)
    {
      f = Axiom;
      ygol = angle1;
      Draw(f,ygol);
    }
     
     else if (f2)
    {
      f = Axiom;
      ygol = angle2;
      Draw(f,ygol);
    }
     
     else if (f3)
    {
      f = Axiom;
      ygol = angle3;
      Draw(f,ygol);
    }

    else if (f4)
    {
      f = Axiom;
      ygol = angle4;
      Draw(f,ygol);
    }

    else if (f5)
    {
      f = Axiom;
      ygol = angle5;
      Draw(f,ygol);
    }
      
    }
}

function Draw(Func,Angle)
{  
  rotation = Angle;
  context.beginPath();
  context.moveTo(coordinate_x, coordinate_y);
  window.console.log("line to hach " + coordinate_x + "  " + coordinate_y)

	for (var i = 0; i < Func.length; i++) {
	    TokenTranslation(Func[i],rotation);
	}
	context.stroke();
}

function TokenTranslation(Token,Roat)
{
  angleRotation = Roat;
  switch(Token) {
	  case 'F':  
	    coordinate_x += Math.cos(angleRotation*count)*Step;
		  coordinate_y += Math.sin(angleRotation*count)*Step;
      context.lineTo(coordinate_x,coordinate_y);
      window.console.log("line to  " + coordinate_x + "  " + coordinate_y)
    break;
    
    case 'b':  
      coordinate_x += Math.cos(angleRotation*count)*Step;
      coordinate_y += Math.sin(angleRotation*count)*Step;
    break;
    
    case '[':
        state.push({'x': coordinate_x , 'y': coordinate_y , 'count': count});
    break;
	  case ']':
         state2 = state.pop();
         coordinate_x = state2.x;
         coordinate_y = state2.y;
         count = state2.count;
         //context.moveTo(state2.x, state2.y);
         context.moveTo(coordinate_x, coordinate_y);
	    break;
	  case '+':  
	    count++;
	    break;
	  case '-':  
	    count--;
	    break;
	}
}
function ClearCanvas()
{
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  coordinate_x = 600;
  coordinate_y = 350;
}