import { USER_ROLES } from "@/types/enums";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const RedirectByRole = async (
  role: string,
  router: AppRouterInstance
) => {
  switch (role) {
    case USER_ROLES.SUPER_ADMIN:
      router.push("/super-admin");
      break;
    case USER_ROLES.CAMPUS_ADMIN:
      router.push("/campus-admin");
      break;
    case USER_ROLES.DEPARTMENT_ADMIN:
      router.push("/department-admin");
      break;
    case USER_ROLES.STUDENT:
      router.push("/user");
      break;
    case USER_ROLES.FACULTY_ACADEMIC:
      router.push("/user");
      break;
    case USER_ROLES.FACULTY_NON_ACADEMIC:
      router.push("/user");
    default:
      router.push("/");
      break;
  }
};
