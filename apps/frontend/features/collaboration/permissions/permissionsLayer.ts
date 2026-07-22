import type { CollaboratorRole } from "../types/collaboration";

export interface PermissionCheckResult {
  allowed: boolean;
  reason?: string;
}

/**
 * PermissionsLayer - Enforces role-based access control (RBAC) across collaboration sessions.
 * Roles: Owner, Editor, Reviewer, Viewer.
 */
export class PermissionsLayer {
  public static canApplyPatch(role: CollaboratorRole): PermissionCheckResult {
    if (role === "Owner" || role === "Editor") {
      return { allowed: true };
    }
    return {
      allowed: false,
      reason: `Role '${role}' does not have edit permissions. Only Owners and Editors can modify the application.`,
    };
  }

  public static canAddComment(role: CollaboratorRole): PermissionCheckResult {
    if (role === "Owner" || role === "Editor" || role === "Reviewer") {
      return { allowed: true };
    }
    return {
      allowed: false,
      reason: `Role '${role}' does not have commenting permissions. Viewers cannot post comments.`,
    };
  }

  public static canRestoreSnapshot(role: CollaboratorRole): PermissionCheckResult {
    if (role === "Owner") {
      return { allowed: true };
    }
    return {
      allowed: false,
      reason: `Role '${role}' cannot restore snapshots. Only session Owners can restore version snapshots.`,
    };
  }

  public static canManageRoles(role: CollaboratorRole): PermissionCheckResult {
    if (role === "Owner") {
      return { allowed: true };
    }
    return {
      allowed: false,
      reason: `Role '${role}' cannot manage peer permissions. Only session Owners can assign roles.`,
    };
  }
}
