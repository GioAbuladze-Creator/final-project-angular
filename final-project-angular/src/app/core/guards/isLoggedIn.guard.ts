import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService } from "../../shared/services/auth.service";

export const isUserLoggedInGuard = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (auth.isAuthorized) {
        return true;
    }
    router.navigate(['/login']);
    return false;
}