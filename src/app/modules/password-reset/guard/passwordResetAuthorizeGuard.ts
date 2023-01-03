import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { PasswordResetService } from "../password-reset.service";

@Injectable()
export class PasswordResetAuthorizeGuard implements CanActivate{

    constructor(
        private passwordResetService: PasswordResetService,
        private router: Router
    ){}
    

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let link = route.params['link'];
        console.log(link);
        let re = new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}");
        if(re.test(link)){
            return true;
        }
        this.router.navigate(["/"])
        return false;
    }

}