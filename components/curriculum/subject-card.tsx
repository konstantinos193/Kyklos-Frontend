import Link from "next/link";
import { BookOpenIcon, GraduationCapIcon, TargetIcon, TrophyIcon } from "@/components/icons";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { getResponsiveSizes, getOptimalQuality } from "@/lib/image-utils";

type IconKind = "book" | "cap" | "target" | "trophy";

interface SubjectCardProps {
  href: string;
  title: string;
  description?: string;
  icon?: IconKind;
  imageUrl?: string;
  priority?: boolean;
}

export function SubjectCard({ href, title, description, icon = "book", imageUrl = "/placeholder.jpg", priority = false }: SubjectCardProps) {
  const Icon = icon === "cap" ? GraduationCapIcon : icon === "target" ? TargetIcon : icon === "trophy" ? TrophyIcon : BookOpenIcon;

  return (
    <Link href={href} className="group block">
      <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
        {/* Media */}
        <div className="relative h-28 sm:h-32 w-full overflow-hidden">
          <OptimizedImage
            src={imageUrl}
            alt={title}
            priority={priority}
            className="h-full w-full"
            sizes={getResponsiveSizes()}
            quality={getOptimalQuality(priority, 'medium')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute left-4 bottom-3 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-[#B91C1C] shadow">
              <Icon className="w-5 h-5" />
            </span>
            <h3 className="text-white text-base sm:text-lg font-semibold drop-shadow">{title}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5">
          {description && (
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">{description}</p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-slate-500">Περισσότερα</span>
            <span className="rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold text-white bg-gradient-to-r from-[#CE3B49] to-[#FF6B6B] group-hover:from-[#B91C1C] group-hover:to-[#CE3B49]">Προβολή</span>
          </div>
        </div>
      </div>
    </Link>
  );
}


