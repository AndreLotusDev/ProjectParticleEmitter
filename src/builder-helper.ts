import { BaseTypeFirework } from "./base-type-firework";
import { FireWorks } from "./fireworks";
import { Fountain } from "./fountain-firework";
import { Position } from "./position-class";
import { Rocket } from "./rocket-firework";
import { Velocity } from "./velocity-class";

class BuilderHelper {

    public typesFirework: { [key: string]: BaseTypeFirework  } 

    constructor() {
        this.typesFirework = {
            ['Fountain']: new Fountain(0,'',0,null),
            ['Rocket']: new Rocket(0,'',0, null, null)
        }
    }

    public buildAndReturn(typeOfFireworkString: string, typeInfoProperties: any, fireworkReference: FireWorks): BaseTypeFirework | undefined {

        let typeExactOfFirework = this.typesFirework[typeOfFireworkString];
        let foundType = false; 

        try {

            if(typeExactOfFirework instanceof Fountain) {

                foundType = true;

                let beginPosition = typeInfoProperties?.begin ?? 0;
                let color = typeInfoProperties?.colour ?? '';
                let duration = typeInfoProperties.duration ?? 0;
                let position = new Position(typeInfoProperties.positions.x, typeInfoProperties.positions.y);

                let fountainTemp = new Fountain(beginPosition, color, duration, position);
                fireworkReference.pushFirework(fountainTemp);

                return fountainTemp;
            }
            
            if(typeExactOfFirework instanceof Rocket) {

                foundType = true;

                let beginPosition = typeInfoProperties?.begin ?? 0;
                let color = typeInfoProperties?.colour ?? '';
                let duration = typeInfoProperties.duration ?? 0;
                let position = new Position(typeInfoProperties.positions?.x ?? 0, typeInfoProperties.positions?.y ?? 0);
    
                let velocity = new Velocity(typeInfoProperties.velocity?.x ?? 0, typeInfoProperties.velocity?.y ?? 0)
    
                let rocketTemp = new Rocket(beginPosition, color, duration, position, velocity);
                fireworkReference.pushFirework(rocketTemp);
    
                return rocketTemp;
            }

        }
        catch(ex) {
            console.log(ex)
        }
        
        if(!foundType)
            throw "Invalid type";
    }

}

export {BuilderHelper}