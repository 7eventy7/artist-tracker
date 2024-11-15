import { useState } from "react";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { Artist, FALLBACK_BACKDROP, FALLBACK_COVER, formatDate } from "../../lib/utils";

interface ArtistDetailProps {
  artist: Artist;
  availableYears: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export function ArtistDetail({
  artist,
  availableYears,
  selectedYear,
  onYearChange,
}: ArtistDetailProps) {
  const [backdropError, setBackdropError] = useState(false);
  const [coverError, setCoverError] = useState(false);

  const backdropSrc = backdropError ? FALLBACK_BACKDROP : artist.backdropImage;
  const coverSrc = coverError ? FALLBACK_COVER : artist.coverImage;

  const sortedReleases = [...artist.releases].sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );

  return (
    <div className="min-h-screen">
      <div className="relative h-[40vh] min-h-[300px]">
        <img
          src={backdropSrc}
          alt={`${artist.name}'s backdrop`}
          onError={() => setBackdropError(true)}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
        
        <div className="absolute left-4 top-4">
          <Link
            to="/artists"
            className="flex items-center gap-1 rounded-lg bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-background/90"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        <div className="absolute right-4 top-4">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center gap-1 rounded-lg bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-background/90">
              {selectedYear}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[8rem] rounded-lg bg-popover p-1 shadow-md"
                sideOffset={5}
              >
                {availableYears.map((year) => (
                  <DropdownMenu.Item
                    key={year}
                    className="relative flex cursor-pointer select-none items-center rounded-md px-6 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
                    onSelect={() => onYearChange(year)}
                  >
                    {year}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-background">
            <img
              src={coverSrc}
              alt={`${artist.name}'s cover`}
              onError={() => setCoverError(true)}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h1 className="text-3xl font-bold">{artist.name}</h1>
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedReleases.map((release) => (
            <div
              key={release.id}
              className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md"
            >
              <time className="text-sm text-muted-foreground">
                {formatDate(release.releaseDate)}
              </time>
              <h3 className="mt-1 font-medium">{release.title}</h3>
            </div>
          ))}
        </div>

        {sortedReleases.length === 0 && (
          <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">No releases found for {selectedYear}</p>
          </div>
        )}
      </div>
    </div>
  );
}